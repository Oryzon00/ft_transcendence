import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
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
	constructor(private prisma: PrismaService) {}

	@WebSocketServer()
	server : Server;

	onModuleInit() {
		this.server.on('connection', (socket) => {
			console.log('connected');
		});
	}

	@SubscribeMessage('newMessage')
	async onNewMessage(@ConnectedSocket() client: Socket, @MessageBody() body : MessagePayload) {
		let res = await this.stockMessages(body);
		console.log(body);
		this.server.to(String(body.channelId)).emit('onMessage', res);
	}

	// If i put the functionnality to modify an already send message
	@SubscribeMessage('changeMessage')
	onChangeMessage(@ConnectedSocket() client: Socket, @MessageBody() body : MessagePayload) {}

	@SubscribeMessage('newChannel')
	async onNewChannel(@ConnectedSocket() client: Socket, @MessageBody() body : ChannelPayload) {
		let channel : Channel = await this.createChannel(body);
		client.join(String(channel.id));
		this.server.to(String(channel.id)).emit('newChannel', channel);
	}

	// New config for a channel
	@SubscribeMessage('changeChannel')
	async onChangeChannel(@ConnectedSocket() client: Socket, @MessageBody() body : ChannelPayload) {}

	@SubscribeMessage('quitChannel')
	async onQuitChannel(@ConnectedSocket() client: Socket, @MessageBody() body : ChannelPayload) {}

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
		const messages: Message = await this.prisma.message.create({
			data: {
				channel: {
					connect: {
						id: message.channelId,
					}
				},
				author: {
					connect: {
						id: message.authorId,
					}
				},
				content: message.content,
			}
		})
		return (messages);
	};

	async createChannel(channel : ChannelPayload) : Promise<Channel> {
		const res : Channel = await this.prisma.channel.create({
			data: {
				users: {
					connect: { id: channel.ownerId },
				},
				//name: channel.name,
			},
		});
		return (res);
	};
}