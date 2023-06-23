import { ServerEvents } from "./ServerEvents";

export type ServerResponseDTO = {
	[ServerEvents.LobbyState]: {

	}

	[ServerEvents.GameMessage]: {
		message: string;
	}
}