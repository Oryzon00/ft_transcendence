import {io, Socket } from 'socket.io-client'
import { createContext } from 'react';


export default class SocketWrapper
{
	public readonly socket: Socket;
	private connectionLost: boolean = false;

	constructor() {
		this.socket = io('localhost:8000', {
			autoConnect: false,
			transports: ['websocket']
		});

		this.onConnect();
		this.onDisconnect();
		this.onException();
	}

	private onConnect(): void {
		this.socket.on('connect', () => {
			if (this.connectionLost) {
				console.log('reconnecting to server')
				this.connectionLost = false;
			}
		});
	}

	private onDisconnect(): void {
		this.socket.on('disconnect',async (reason: string) => {
			if (reason === 'io client disconnect') {

			}
		})
	}
}

const socketWrapper = new SocketWrapper();

export const SocketWrapperContext = createContext<SocketWrapper>(socketWrapper);
