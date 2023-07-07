import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagePayload, ChannelPayload } from './chat';
import { Channel } from '@prisma/client';

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
			console.log(this.getUserData(1));
			/*
			this.server.to(socket.id).emit('onMessage', {
				msg: "New message",
				content: "test"
			});
			*/
		});
	}

	@SubscribeMessage('newMessage')
	onNewMessage(client: Socket, @MessageBody() body : MessagePayload) {
		this.stockMessages(body);
		this.server.emit('onMessage', {
			msg: "New message",
			content: body.content,
		}
		)
	}

	@SubscribeMessage('changeMessage')
	onChangeMessage(client: Socket, @MessageBody() body : MessagePayload) {}

	@SubscribeMessage('newChannel')
	onNewChannel(client: Socket, @MessageBody() body : ChannelPayload) {
		this.createChannel(body);
		client.join(String(body.userId));
		this.server.emit('newChannel', {
			msg: "New channel",
			channelName: "boom",
		}
		)
	}

	@SubscribeMessage('changeChannel')
	onChangeChannel(client: Socket, @MessageBody() body : ChannelPayload) {}

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

	async stockMessages(message : MessagePayload) {
		const messages = await this.prisma.message.create({
			data: {
				channelId: message.channelId,
				authorId: message.authorId,
				content: message.content
			}
		})
		return (message);
	};

	async createChannel(channel : ChannelPayload) {
		const res : Channel = await this.prisma.channel.create({
			data: {
				ownerId: 1,
			},
		});
		return (res);
	};
}