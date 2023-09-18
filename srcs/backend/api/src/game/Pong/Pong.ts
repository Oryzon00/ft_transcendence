import { Socket } from "socket.io";
import { Lobby } from "../Lobby/Lobby";
import { ServerEvents } from "../types/ServerEvents";
import { ServerResponseDTO } from "../types/ServerResponseDTO";
import { Ball } from "./types/Ball";
import { Paddle } from "./types/Paddle";
import { Point } from "./types/Point";
import { MovePaddleDTO } from "./MovePaddleDTO";
import { Interval } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { AuthenticatedSocket } from "../types/AuthenticatedSocket";

export class Pong {
	//States
	public hasStarted: boolean = false;

	public hasFinished: boolean = false;

	public isPaused: boolean = false;

	public countdown: number = 0;

	public startTimer: number;
	public endTimer: number = 300000;

	private lastUpdate: number = (new Date()).getTime();

	//Game Components Infos
	public readonly height: number = 800;
	public readonly width: number = 800;

	public readonly ball: Ball = new Ball(800, 800, 7);

	public readonly paddles: Map<AuthenticatedSocket["id"], Paddle> = new Map<AuthenticatedSocket["id"], Paddle>();

	public scores: Map<AuthenticatedSocket["id"], number> = new Map<AuthenticatedSocket["id"], number>();

	constructor(public readonly lobby: Lobby) {
		for (const id of this.lobby.clients.keys())
			this.scores.set(id, 0);
	}

	//Methods
	public start(): void {
		if (this.hasStarted) return;

		this.hasStarted = true;

		for (const id of this.lobby.clients.keys()) {
			this.scores.set(id, 0);
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
		
		this.startTimer = (new Date().getTime());
		//gameLoop
		//send event winner + update players MMR
	}

	
	public loop(): void {
		if (this.hasStarted !== true || this.hasFinished) return;
		this.nextFrame();
		this.lobby.sendLobbyState();
		if ((new Date()).getTime() - this.startTimer === this.endTimer)
			this.end();
		
		
		for (const id of this.lobby.clients.keys()) {
			if (this.scores.get(id) >= 1) {
				this.endgame(id);
			}
		}
	}

	private endgame(winnerId: string) {
		let loserId: string;
		for (const id of this.lobby.clients.keys()) {
			if (id != winnerId)
				this.lobby.endInstance(this.lobby.clients.get(winnerId).userId, this.lobby.clients.get(id).userId);
		}
		this.end();
	}

	private updateball() {		
		if (this.ball.speed.angle > Math.PI / 2 || this.ball.speed.angle < -Math.PI / 2)
			this.ball.checkBounce(this.paddles.values().next().value);
		else {
			const it: IterableIterator<Paddle> = this.paddles.values();
			it.next();
			this.ball.checkBounce(it.next().value);
		}

		let score: 0 | 1 | 2 | undefined = this.ball.respawn();
		if (score) {
			let arr = Array.from(this.lobby.clients.keys());
			this.scores.set(arr[score - 1], this.scores.get(arr[score - 1]) + 1);
			for (let pad of this.paddles.values()){
				pad.pos.y = 350;
				pad.downKey = false;
				pad.upKey = false;
			}
			this.countdown = 5000;
		}
	}

	private updatePaddles() {
		for (const pad of this.paddles.values()) {
			if (pad.upKey) pad.pos.y -= 10;
			if (pad.downKey) pad.pos.y += 10;
			
			if (pad.pos.y < -50) pad.pos.y = -50;
			if (pad.pos.y > 750) pad.pos.y = 750;
		}
	}

	private nextFrame() {
		
		if (this.countdown === 0) {
			this.updatePaddles();
			this.updateball();
		} else {
			this.countdown -= ((new Date()).getTime() - this.lastUpdate);
			this.countdown = this.countdown < 0 ? 0 : this.countdown; 
		}
		
		this.lastUpdate = (new Date().getTime());
	}

	public end(): void {
		if (this.hasFinished || !this.hasStarted) return;

		this.hasFinished = true;

		
		this.lobby.sendEvent<ServerResponseDTO[ServerEvents.GameMessage]>(
			ServerEvents.GameMessage,
			{
				message: "Game is Finished",
				mode: this.lobby.maxClients === 2 ? "PvP" : "PvE"
			}
		);
	}

	public movePaddle(data: MovePaddleDTO): void {
		let pad: Paddle = this.paddles.get(data.clientId);
		if (pad && !pad.isCheatedPosition(data.keyPressed)) {
			pad.newPosition(data.keyPressed);
		}
		
		// this.lobby.sendLobbyState();
	}
}
