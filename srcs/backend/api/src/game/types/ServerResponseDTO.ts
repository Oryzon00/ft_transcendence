import { LobbyMode } from "../Lobby/lobby.types";
import { Point } from "../Pong/types/Point";
import { ServerEvents } from "./ServerEvents";


export type ServerResponseDTO = {
	[ServerEvents.LobbyState]: {
		lobbyId: string,
		lobbyMode: LobbyMode,
		hasStarted: boolean,
		hasFinished: boolean,
		isPaused: boolean,
		playersCount: number,
		gameWidth: number,
		gameHeight: number,
		ballPosition: Point,
		padPositions: Map<string, Point>,
		scores: Map<string, number>,
	}

	[ServerEvents.GameMessage]: {
		message: string;
		mode: LobbyMode;		
	}

	[ServerEvents.Pong]: {
		message: string
	}
}