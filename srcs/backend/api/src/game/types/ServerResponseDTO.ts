import { LobbyMode } from "../Lobby/lobby.types";
import { Paddle } from "../Pong/types/Paddle";
import { Point } from "../Pong/types/Point";
import { ServerEvents } from "./ServerEvents";


export type ServerResponseDTO = {
	[ServerEvents.LobbyState]: {
		lobbyId: string,
		lobbyMode: LobbyMode,
		hasStarted: boolean,
		hasFinished: boolean,
		countdown: number,
		isPaused: boolean,
		playersCount: number,
		gameWidth: number,
		gameHeight: number,
		ballPosition: Point,
		padPositions: Record<string, Paddle>,
		scores: Record<string, number>,
	}

	[ServerEvents.GameMessage]: {
		message: string;
		mode: LobbyMode;		
	}

	[ServerEvents.Pong]: {
		message: string
	}
}