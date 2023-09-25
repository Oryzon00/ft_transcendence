import { Server, Socket } from "socket.io";
import * as jwt from "jsonwebtoken";
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
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { GameStatus } from "@prisma/client";


@WebSocketGateway({
	path: "/game"
})
export class GameGateway
	implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
	constructor(
		private lobbyManager: LobbyManager,
		private prisma: PrismaService
	) {}

	afterInit(server: Server): void {
		this.lobbyManager.server = server;
	}

	async handleConnection(
		client: AuthenticatedSocket,
		...args: any[]
	): Promise<void> {
		await this.lobbyManager.initSocket(client);
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
	async onLobbyCreate( client: AuthenticatedSocket, data: LobbyCreateDto ): Promise< WsResponse<ServerResponseDTO[ServerEvents.GameMessage]> > {
		if ((await this.prisma.user.findUnique({
			where: {id : client.userId}, 
			include: {gameProfile: true}
		})).gameProfile.status === GameStatus.IDLE) {
			await this.prisma.gameProfile.update({
				where: { userId: client.userId },
				data: { status: GameStatus.IN_LOBBY },
			});
			
			let lobby = this.lobbyManager.findLobby(client.id, data.mode);
			if (lobby) {
				await this.lobbyManager.joinLobby(client, lobby.Id);

				return {
					event: ServerEvents.GameMessage,
					data: {
						message: "Lobby Joined " + lobby.Id,
						mode: data.mode,
						lobbyId: lobby.Id,
						player1MMR: "",
						player2MMR: "",
					}
				};
			} else {
				lobby = await this.lobbyManager.createLobby(data.mode);
				lobby.addClient(client);

				return {
					event: ServerEvents.GameMessage,
					data: {
						message: "Lobby Created " + lobby.Id,
						mode: data.mode,
						lobbyId: lobby.Id,
						player1MMR: "",
						player2MMR: "",
						}
					};
				}
			}
		}

	@SubscribeMessage(ClientEvents.LobbyJoin)
	async onLobbyJoin(
		client: AuthenticatedSocket,
		data: LobbyJoinDto
	): Promise<WsResponse<ServerResponseDTO[ServerEvents.GameMessage]> > {
		this.lobbyManager.joinLobby(client, data.lobbyId);

		return {
			event: ServerEvents.GameMessage,
			data: {
				message: "Lobby Joined " + client.data.lobby.Id,
				mode: "PvE",
				lobbyId: client.data.lobby.Id,
				player1MMR: "",
				player2MMR: "",
			}
		};
	}

	@SubscribeMessage(ClientEvents.MovePaddle)
	onMovePaddle(client: AuthenticatedSocket, data: MovePaddleDTO): void {
		if (!client.data.lobby) throw new WsException("You are not in a lobby");
		client.data.lobby.game.movePaddle(data);
	}

	@SubscribeMessage(ClientEvents.LobbyLeave)
	async onLobbyLeave(client: AuthenticatedSocket): Promise<void> {
		console.log("receiving");
		await this.lobbyManager.endSocket(client);
	}
}
