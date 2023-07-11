import { LobbyMode } from "../Lobby/lobby.types";
import { ServerEvents } from "./ServerEvents";

export type ServerResponseDTO = {
	[ServerEvents.LobbyState]: {

	}

	[ServerEvents.GameMessage]: {
		message: string;
		mode: LobbyMode;
	}

	[ServerEvents.Pong]: {
		message: string
	}
}