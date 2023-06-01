import { Injectable } from '@nestjs/common';
import { WebSocketServer } from 'ws';

@Injectable()
export class ChatService {
	constructor(private websocket : WebSocketServer({ port: '3000' }));

	sendMessage(message, channel) {
		com.send('something');
	}
}
