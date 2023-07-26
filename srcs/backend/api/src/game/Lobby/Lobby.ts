import { Server } from "socket.io";
import { v4 } from "uuid";
import { Socket } from "socket.io";
import { AuthenticatedSocket } from "../types/AuthenticatedSocket";
import { Pong } from "../Pong/Pong";
import { ServerEvents } from "../types/ServerEvents";
import { ServerResponseDTO } from "../types/ServerResponseDTO";
import { Paddle } from "../Pong/types/Paddle";
import { Point } from "../Pong/types/Point";

export class Lobby {
	public readonly Id: string = v4();
	public startedAt: number;

	public readonly clients: Map<Socket["id"], AuthenticatedSocket> = new Map<
		Socket["id"],
		AuthenticatedSocket
	>();

	public readonly game: Pong = new Pong(this);

	constructor(private readonly server: Server, public readonly maxClients: number) {}

	public removeClient(client: AuthenticatedSocket): void {}

	public sendLobbyState(): void {
		
		
		function MapToRecord<V>(map: Map<string, V>): Record<string, V> {
		let newRecord: Record<string, V> = {};
			for (let [key, value] of map) {
			  newRecord[key] = value;
			}
			return newRecord
		}
		
		const payload: ServerResponseDTO[ServerEvents.LobbyState] = {
			lobbyId: this.Id,
			lobbyMode: this.maxClients === 1 ? 'PvE' : 'PvP',
			hasStarted: this.game.hasStarted,
			hasFinished: this.game.hasFinished,
			isPaused: this.game.isPaused,
			playersCount: this.clients.size,
			gameWidth: this.game.width,
			gameHeight: this.game.height,
			ballPosition: this.game.ball.pos,
			padPositions: MapToRecord(this.game.paddles),
			scores: MapToRecord(this.game.scores),
		}
		
		this.sendEvent<ServerResponseDTO[ServerEvents.LobbyState]>(ServerEvents.LobbyState, payload);
	}

	public sendEvent<T>(event: ServerEvents, payload: T): void
	{
    	this.server.to(this.Id).emit(event, payload);
	}

	private startGame(mode: number) {
		this.game.start();
		this.startedAt = (new Date()).getTime();
	}

	public addClient(client: AuthenticatedSocket): void {
		this.clients.set(client.id, client);
		client.join(this.Id);
		client.data.lobby = this;

		if (this.clients.size >= this.maxClients) {
			this.startGame(this.maxClients);
		}
	}
}