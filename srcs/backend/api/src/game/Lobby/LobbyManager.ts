import { Server, Socket } from "socket.io";
import { LobbyMode } from "./lobby.types";
import { Lobby } from "./Lobby";
import { AuthenticatedSocket } from "../types/AuthenticatedSocket";
import { WebSocketServer, WsException } from "@nestjs/websockets";
import { Inject, Injectable } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { ServerResponseDTO } from "../types/ServerResponseDTO";
import { ServerEvents } from "../types/ServerEvents";
import { GameService } from "../game.service";
import { GameGateway } from "../game.gateway";
import { PrismaService } from "src/prisma/prisma.service";
import { AppModule } from "src/app.module";

@Injectable()
export class LobbyManager {
	@WebSocketServer()
	public server: Server;

	constructor(@Inject(GameService) private gameService: GameService) {};

	public readonly lobbies: Map<Lobby["Id"], Lobby> = new Map<Lobby["Id"], Lobby>();

	public async initSocket(client: AuthenticatedSocket): Promise<void> {
		client.data.lobby = null;
		await this.gameService.updateSocket(client);
	}

	public endSocket(client: AuthenticatedSocket): void {
		for(let lobby of this.lobbies.values()) {
			if (lobby.clients.has(client.id)) {
				lobby.removeClient(client);
			}
		}
	}

	public async createLobby(mode: LobbyMode): Promise<Lobby> {
		let maxClients: number = mode === "PvE" ? 1 : 2;

		const lobby = new Lobby(this.server, maxClients, mode, this.gameService.prisma);
		await lobby.addToDb();

		this.lobbies.set(lobby.Id, lobby);

		return lobby;
	}

	public joinLobby(client: AuthenticatedSocket, id: string): void {
		const lobby: Lobby | undefined = this.lobbies.get(id);

		try {
			if (!lobby) {
				throw new WsException("lobby not found.");
			}

			if (lobby.clients.size >= lobby.maxClients) {
				throw new WsException("lobby is already full.");
			}
			lobby.addClient(client);
		} catch(error) {
			console.log(error);
		}
	}

	public findLobby(clientId : string, mode: LobbyMode): Lobby | undefined {
		for(let lobby of this.lobbies.values())
			if (lobby.gamemode === mode && lobby.clients.size < 2 && !lobby.clients.has(clientId))
				return(lobby);
		return undefined;
	}

	@Interval(1000 / 60)
	public refreshGame()
	{
		for(let lobby of this.lobbies.values()) {
			if (lobby.game.hasStarted && !lobby.game.hasFinished)
				lobby.game.loop();
		}
	}

	@Cron('*/10 * * * *')
	private cleanLobbies(): void {
		for(let [id, lobby] of this.lobbies) {
			const now = (new Date()).getTime();
			const lobbyLifetime = now - lobby.startedAt;
			
			if (lobby.game.hasFinished || !lobby.clients.size || lobbyLifetime > 1000 * 60 * 12)
			{
				lobby.sendEvent<ServerResponseDTO[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
					message: 'Game timed out',
					mode: lobby.maxClients === 1 ? 'PvE' : 'PvP',
					lobbyId: lobby.Id,
					player1MMR: "",
					player2MMR: "",
				});
				this.lobbies.delete(id);
			}
		}
	}
}
