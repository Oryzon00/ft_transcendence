import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
	cors: {
		origins: ['http://localhost:3000'],
	}
})
export class ChatService implements OnModuleInit{ 
	constructor(private prisma: PrismaService) {}

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
		//this.stockMessages(body)
		this.server.emit('onMessage', {
			msg: "New message",
			content: body.content,
		}
		)
	}

	async stockMessages(message : any) {
		const messages = await this.prisma.message.create({
			data: {
				channel: message.channel,
				author: message.author,
				content: message.content
			}
		})
	}
}