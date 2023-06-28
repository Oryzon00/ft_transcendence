import { Server, Socket } from "socket.io";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WsResponse } from "@nestjs/websockets";
import { ServerEvents } from "./types/ServerEvents";
import { ClientEvents } from "./types/ClientEvents";

import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { UsePipes, ValidationPipe } from "@nestjs/common";
import { LobbyManager } from "./Lobby/LobbyManager";
import { AuthenticatedSocket } from "./types/AuthenticatedSocket ";
import { LobbyCreateDto, LobbyJoinDto } from "./Lobby/lobby.types";
import { ServerResponseDTO } from "./types/ServerResponseDTO";

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
	
	constructor(private lobbyManager: LobbyManager) {	

	}
	
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
	onPing(client: Socket): WsResponse<{ message: string }> {
		return {
			event: ServerEvents.Pong,
			data: {
				message: "pong"
			}
		};
	}

	@SubscribeMessage(ClientEvents.LobbyCreate)
	onLobbyCreate(client: AuthenticatedSocket, data: LobbyCreateDto): WsResponse<ServerResponseDTO[ServerEvents.GameMessage]> {
		const lobby = this.lobbyManager.createLobby(data.mode);
		lobby.addClient(client);
		
		return {
			event: ServerEvents.GameMessage,
			data: {
				message: 'Lobby Created'
			}
		};
	}

	@SubscribeMessage(ClientEvents.LobbyJoin)
	onLobbyJoin(client: AuthenticatedSocket, data: LobbyJoinDto): WsResponse<ServerResponseDTO[ServerEvents.GameMessage]> {
		this.lobbyManager.joinLobby(client, data.lobbyId);

		return {
			event: ServerEvents.GameMessage,
			data: {
				message: 'Lobby Joined'
			}
		};
	}

	@SubscribeMessage(ClientEvents.LobbyLeave)
	onLobbyLeave(client: AuthenticatedSocket): void
	{
		client.data.lobby?.removeClient(client);
	}
}
