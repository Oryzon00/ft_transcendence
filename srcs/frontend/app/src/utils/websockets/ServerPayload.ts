import { ServerEvents } from "./types";

export type Point = {
	x: number;
	y: number;
}

interface Paddle {
	pos: Point;
	readonly width: number;
	readonly height: number;
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
		padPositions: Record<string, Paddle>,
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