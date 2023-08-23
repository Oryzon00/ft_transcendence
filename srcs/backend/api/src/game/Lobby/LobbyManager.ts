import { Server, Socket } from "socket.io";
import { LobbyMode } from "./lobby.types";
import { Lobby } from "./Lobby";
import { AuthenticatedSocket } from "../types/AuthenticatedSocket";
import { WebSocketServer, WsException } from "@nestjs/websockets";
import { Injectable } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { ServerResponseDTO } from "../types/ServerResponseDTO";
import { ServerEvents } from "../types/ServerEvents";
import { GameService } from "../game.service";

@Injectable()
export class LobbyManager {
	@WebSocketServer()
	public server: Server;

	private gameService: GameService;

	public readonly lobbies: Map<Lobby["Id"], Lobby> = new Map<Lobby["Id"], Lobby>();

	public initSocket(client: AuthenticatedSocket): void {
		client.data.lobby = null;
		this.gameService.updateSocket()
	}

	public endSocket(client: AuthenticatedSocket): void {
		client.data.lobby?.removeClient(client);
	}

	public createLobby(mode: LobbyMode): Lobby {
		let maxClients: number = mode === "PvE" ? 1 : 2;

		const lobby = new Lobby(this.server, maxClients);

		this.lobbies.set(lobby.Id, lobby);

		return lobby;
	}

	public joinLobby(client: AuthenticatedSocket, id: string): void {
		const lobby: Lobby | undefined = this.lobbies.get(id);

		if (!lobby) {
			throw new WsException("lobby not found.");
		}

		if (lobby.clients.size >= lobby.maxClients) {
			throw new WsException("lobby is already full.");
		}

		lobby.addClient(client);
	}

	public findLobby(clientId : string, mode: LobbyMode): Lobby | undefined {
		for(let lobby of this.lobbies.values())
			if (lobby.maxClients === 2 && mode === 'PvP' && lobby.clients.size < 2 && !lobby.clients.has(clientId))
				return(lobby);
		return undefined;
	}

	@Interval(1000 / 60)
	public refreshGame()
	{
		for(let lobby of this.lobbies.values()) {
			if (lobby.game.hasStarted)
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
				});
				this.lobbies.delete(id);
			}
		}
	}
}
