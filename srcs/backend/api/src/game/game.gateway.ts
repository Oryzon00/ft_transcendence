import { Server, Socket } from "socket.io";
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	WsResponse,
	SubscribeMessage,
	WebSocketGateway,
	WsException
} from "@nestjs/websockets";
import { ServerEvents } from "./types/ServerEvents";
import { ClientEvents } from "./types/ClientEvents";
import { LobbyManager } from "./Lobby/LobbyManager";
import { AuthenticatedSocket } from "./types/AuthenticatedSocket";
import { LobbyCreateDto, LobbyJoinDto } from "./Lobby/lobby.types";
import { ServerResponseDTO } from "./types/ServerResponseDTO";
import { MovePaddleDTO } from "./Pong/MovePaddleDTO";
import { Cron } from "@nestjs/schedule";

@WebSocketGateway({
	cors: {
		origins: ["http://localhost:3000"]
	}
})
export class GameGateway
	implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
	constructor(private lobbyManager: LobbyManager) {}

	afterInit(server: Server): void {
		this.lobbyManager.server = server;
	}

	async handleConnection(client: Socket, ...args: any[]): Promise<void> {
		this.lobbyManager.initSocket(client as AuthenticatedSocket);
	}

	async handleDisconnect(client: AuthenticatedSocket): Promise<void> {
		this.lobbyManager.endSocket(client);
	}

	@SubscribeMessage(ClientEvents.Ping)
	onPing(client: Socket): WsResponse<ServerResponseDTO[ServerEvents.Pong]> {
		return {
			event: ServerEvents.Pong,
			data: {
				message: "pong"
			}
		};
	}

	@SubscribeMessage(ClientEvents.LobbyCreate)
	onLobbyCreate( client: AuthenticatedSocket, data: LobbyCreateDto ): WsResponse<ServerResponseDTO[ServerEvents.GameMessage]> {
		let lobby = this.lobbyManager.findLobby(client.id, data.mode);
		if (lobby) {
			this.lobbyManager.joinLobby(client, lobby.Id);

			return {
				event: ServerEvents.GameMessage,
				data: {
					message: "Lobby Joined " + lobby.Id,
					mode: data.mode
				}
			};
		} else {
			lobby = this.lobbyManager.createLobby(data.mode);
			lobby.addClient(client);

			return {
				event: ServerEvents.GameMessage,
				data: {
					message: "Lobby Created " + lobby.Id,
					mode: data.mode
				}
			};
		}
	}

	@SubscribeMessage(ClientEvents.LobbyJoin)
	onLobbyJoin(
		client: AuthenticatedSocket,
		data: LobbyJoinDto
	): WsResponse<ServerResponseDTO[ServerEvents.GameMessage]> {
		this.lobbyManager.joinLobby(client, data.lobbyId);

		return {
			event: ServerEvents.GameMessage,
			data: {
				message: "Lobby Joined " + client.data.lobby.Id,
				mode: "PvE"
			}
		};
	}

	@SubscribeMessage(ClientEvents.MovePaddle)
	onMovePaddle(client: AuthenticatedSocket, data: MovePaddleDTO): void {
		if (!client.data.lobby) throw new WsException("You are not in a lobby");
		client.data.lobby.game.movePaddle(data);
	}

	@SubscribeMessage(ClientEvents.LobbyLeave)
	onLobbyLeave(client: AuthenticatedSocket): void {
		client.data.lobby?.removeClient(client);
	}
}
