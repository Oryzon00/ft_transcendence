import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
	cors: {
		origins: ['http://localhost:3000'],
	}
})
export class ChatService implements OnModuleInit{ 
	@WebSocketServer()
	server : Server;

	onModuleInit() {
		this.server.on('connection', (socket) => {
			console.log(socket.id);
			console.log('connected');
		});
	}
	@SubscribeMessage('newMessage')
	onNewMessage(@MessageBody() body : any) {
		console.log(body);
		this.server.emit('onMessage', {
			msg: "New message",
			content: body,
		}
		)
	}
}