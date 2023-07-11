import { ServerEvents } from "./types";

export type ServerPayload = {
	[ServerEvents.LobbyState]: {

	}

	[ServerEvents.GameMessage]: {
		message: string;
        mode: 'PvE' | 'PvP';
	}

    [ServerEvents.Pong]: {
        message: string;
    }
}