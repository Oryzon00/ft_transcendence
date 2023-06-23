import {Server} from 'socket.io'
import { v4 } from 'uuid'
import { Socket } from 'socket.io';
import { AuthenticatedSocket } from '../types/AuthenticatedSocket ';

export class Lobby {

	public readonly Id: string = v4();

	public readonly clients : Map<Socket['id'], AuthenticatedSocket> = new Map<Socket['id'], AuthenticatedSocket>();

	constructor(private readonly server: Server, public readonly maxClients : number) {
	}

	public removeClient(client: AuthenticatedSocket) : void {

	}

	private startGame(mode: number) {
		
	}

	public addClient(client: AuthenticatedSocket) : void {
		this.clients.set(client.id, client);
		client.join(this.Id);
		client.data.lobby = this;

		if (this.clients.size >= this.maxClients) {
			this.startGame(this.maxClients);
		}
	}
}