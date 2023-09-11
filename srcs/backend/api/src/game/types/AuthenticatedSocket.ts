import { Socket } from "socket.io";
import { Lobby } from "../Lobby/Lobby";
import { ServerEvents } from "./ServerEvents";
import { User } from "@prisma/client";

export type AuthenticatedSocket = Socket & {
	data: {
		lobby: null | Lobby;
	};
	user: any

	emit: <T>(ev: ServerEvents, data: T) => boolean;
};
