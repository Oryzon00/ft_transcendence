import { Socket } from "socket.io";
import { Lobby } from "../Lobby/Lobby";
import { ServerEvents } from "../types/ServerEvents";
import Point, { ServerResponseDTO } from "../types/ServerResponseDTO";
import { GameUpdateDto } from "./GameUpdateDTO";



export class Pong {
	public hasStarted: boolean = false;

	public hasFinished: boolean = false;

	public isPaused: boolean = false;

	public readonly ballPosition: Point;

	public readonly padPositions: Record<Socket['id'], Point> = {};

	public scores: Record<Socket['id'], number> = {};

	constructor(private lobby: Lobby)
	{

	}

	public start(): void
	{
		if (this.hasStarted)
			return;

		this.hasStarted = true;

		this.lobby.sendEvent<ServerResponseDTO[ServerEvents.GameMessage]>(
			ServerEvents.GameMessage, 
			{
				message: 'Game is Starting',
				mode: this.lobby.maxClients === 2 ? 'PvP' : 'PvE'
			});

		//game loop?
		//while()
	}

	public end(): void
	{
		if (this.hasFinished || !this.hasStarted)
			return;
		
		this.hasFinished = true;

		this.lobby.sendEvent<ServerResponseDTO[ServerEvents.GameMessage]>(
			ServerEvents.GameMessage,
			{
				message: 'Game is Finished',
				mode: this.lobby.maxClients === 2 ? 'PvP' : 'PvE'
			});
	}

	public updateState(data: GameUpdateDto): void {
		
		this.lobby.sendLobbyState();
	}
}