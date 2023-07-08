import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagePayload, ChannelPayload } from './chat';
import { Channel, Message } from '@prisma/client';

@WebSocketGateway({
	cors: {
		origins: ['http://localhost:3000'],
	}
})
export class ChatService implements OnModuleInit{ 
	constructor(private prisma: PrismaService, /*, public socketId : string*/) {}

	@WebSocketServer()
	server : Server;

	onModuleInit() {
		this.server.on('connection', (socket) => {
			console.log('connected');
		});
	}

	@SubscribeMessage('newMessage')
	async onNewMessage(client: Socket, @MessageBody() body : MessagePayload) {
		console.log(body);
		let res = await this.stockMessages(body);
		//this.server.emit('onMessage', res);
	}

	@SubscribeMessage('changeMessage')
	onChangeMessage(client: Socket, @MessageBody() body : MessagePayload) {}

	@SubscribeMessage('newChannel')
	async onNewChannel(client: Socket, @MessageBody() body : ChannelPayload) {
		let channel : Channel = await this.createChannel(body);
		//this.server.on('connection', () => { client.join(String(channel.id)); });
		this.server.emit('newChannel', channel);
	}

	@SubscribeMessage('changeChannel')
	async onChangeChannel(client: Socket, @MessageBody() body : ChannelPayload) {}


	// Write in Databse part //
	async getUserData(userId) {
		const res = await this.prisma.user.findUnique({
				where: {
					id: userId
				},
				select: {
					channel: true,
					message: true,
				}
		})
		return (res);
	};

	async stockMessages(message : MessagePayload) : Promise<Message>{
		const messages = await this.prisma.message.create({
			data: {
				channelId: message.channelId,
				authorId: message.authorId,
				content: message.content,
			}
		})
		return (messages);
	};

	async createChannel(channel : ChannelPayload) : Promise<Channel> {
		const res : Channel = await this.prisma.channel.create({
			data: {
				ownerId: 1, // Temp
			},
		});
		return (res);
	};
}