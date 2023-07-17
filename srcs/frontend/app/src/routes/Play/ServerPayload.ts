import { ServerEvents } from "./types";

export type Point = {
	x: number;
	y: number;
}

export type ServerPayload = {
	[ServerEvents.LobbyState]: {
		lobbyId: string,
		lobbyMode: "PvP" | "PvE",
		hasStarted: boolean,
		hasFinished: boolean,
		isPaused: boolean,
		playersCount: number,
		gameWidth: number,
		gameHeight: number,
		ballPosition: Point,
		padPositions: Record<string, Point>,
		scores: Record<string, number>,
	}

	[ServerEvents.GameMessage]: {
		message: string;
        mode: 'PvE' | 'PvP';
	}

    [ServerEvents.Pong]: {
        message: string;
    }
}