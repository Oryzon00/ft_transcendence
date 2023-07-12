import { Socket } from "socket.io";
import { Lobby } from "../Lobby/Lobby";
import { ServerEvents } from "../types/ServerEvents";
import { ServerResponseDTO } from "../types/ServerResponseDTO";
import { Ball } from "./types/Ball";
import { Paddle } from "./types/Paddle";
import { MovePaddleDTO } from "./MovePaddleDTO";

export class Pong {
	//States
	public hasStarted: boolean = false;

	public hasFinished: boolean = false;

	public isPaused: boolean = false;

	public countdown: number = 0;

	private intervalID;

	//Game Components Infos
	public readonly height: number = 800;
	public readonly width: number = 800;

	public readonly ball: Ball;

	public readonly paddles: Map<Socket["id"], Paddle> = new Map<Socket["id"], Paddle>();

	public scores: Record<Socket["id"], number> = {};

	constructor(private lobby: Lobby) {}

	//Methods
	public start(): void {
		if (this.hasStarted) return;

		this.hasStarted = true;

		for (const id in this.lobby.clients) {
			if (this.paddles.size !== 0) this.paddles.set(id, new Paddle("away"));
			else this.paddles.set(id, new Paddle("home"));
		}

		this.lobby.sendEvent<ServerResponseDTO[ServerEvents.GameMessage]>(
			ServerEvents.GameMessage,
			{
				message: "Game is Starting",
				mode: this.lobby.maxClients === 2 ? "PvP" : "PvE"
			}
		);

		//countdown 5

		this.intervalID = setInterval(() => this.nextFrame(), 17);

		this.end();
	}

	private nextFrame() {
		// this.ball.update(Object.entries(paddles));
	}

	public end(): void {
		if (this.hasFinished || !this.hasStarted) return;

		this.hasFinished = true;
		clearInterval(this.intervalID);

		this.lobby.sendEvent<ServerResponseDTO[ServerEvents.GameMessage]>(
			ServerEvents.GameMessage,
			{
				message: "Game is Finished",
				mode: this.lobby.maxClients === 2 ? "PvP" : "PvE"
			}
		);
	}

	public movePaddle(data: MovePaddleDTO): void {
		let pad: Paddle = this.paddles[data.clientId];
		if (pad.isCheatedPosition(data.padPosition)) {
			pad.newPosition(data.padPosition);
		}
		this.lobby.sendLobbyState();
	}
}
