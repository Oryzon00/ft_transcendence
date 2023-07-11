import { LobbyMode } from "../Lobby/lobby.types";
import { ServerEvents } from "./ServerEvents";

export default class Point {
    x: number = 0;
    y: number = 0;
}

export type ServerResponseDTO = {
	[ServerEvents.LobbyState]: {
		lobbyId: string,
		lobbyMode: LobbyMode,
		hasStarted: boolean,
		hasFinished: boolean,
		isPaused: boolean,
		playersCount: number,
		ballPosition: Point,
		padPositions: Record<string, Point>,
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