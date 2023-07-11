import { Server, Socket } from "socket.io";
import { LobbyMode } from "./lobby.types";
import { Lobby } from "./Lobby";
import { AuthenticatedSocket } from "../types/AuthenticatedSocket";
import { WebSocketServer, WsException } from "@nestjs/websockets";

export class LobbyManager {
	@WebSocketServer()
	public server: Server;

	public readonly lobbies: Map<Lobby["Id"], Lobby> = new Map<Lobby["Id"], Lobby>();

	public initSocket(client: AuthenticatedSocket): void {
		client.data.lobby = null;
	}

	public endSocket(client: AuthenticatedSocket): void {
		client.data.lobby?.removeClient(client);
	}

	public createLobby(mode: LobbyMode): Lobby {
		let maxClients: number = mode === "PvE" ? 1 : 2;

		const lobby = new Lobby(this.server, maxClients);

		this.lobbies.set(lobby.Id, lobby);

		return lobby;
	}

	public joinLobby(client: AuthenticatedSocket, id: string): void {
		const lobby: Lobby | undefined = this.lobbies.get(id);

		if (!lobby) {
			throw new WsException("lobby not found.");
		}

		if (lobby.clients.size >= lobby.maxClients) {
			throw new WsException("lobby is already full.");
		}

		lobby.addClient(client);
	}

	public findLobby(clientId : string, mode: LobbyMode): Lobby | undefined {
		for(let lobby of this.lobbies.values())
			if (lobby.maxClients === 2 && mode === 'PvP' && lobby.clients.size < 2 && !lobby.clients.has(clientId))
				return(lobby);
		return undefined;
	}
}
