import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagePayload, ChannelPayload } from './chat';
import { Channel, Member, Message } from '@prisma/client';
import ChannelDatabase from './database/channel';

@WebSocketGateway({
	cors: {
		origins: ['http://localhost:3000'],
	}
})
export class ChatGateway implements OnModuleInit{ 

	constructor(private db : ChannelDatabase) {};

	@WebSocketServer()
	server : Server;

	onModuleInit() {
		this.server.on('connection', (socket) => {
			console.log('connected');
			socket.to(socket.id).emit('onConnection', )
		});
	}

	@SubscribeMessage('newMessage')
	async onNewMessage(@ConnectedSocket() client: Socket, @MessageBody() body : MessagePayload) {
		let res = await this.db.stockMessages(body);
		console.log(res);
		this.server.to(String(body.channelId)).emit('onMessage', res);
	}

	// If i put the functionnality to modify an already send message
	@SubscribeMessage('changeMessage')
	onChangeMessage(@ConnectedSocket() client: Socket, @MessageBody() body : MessagePayload) {}

	@SubscribeMessage('newChannel')
	async onNewChannel(@ConnectedSocket() client: Socket, @MessageBody() body : ChannelPayload) {
		let channel : Channel = await this.db.createChannel(body);
		client.join(String(channel.id));
		console.log(channel.id);
		this.server.to(String(channel.id)).emit('onChannel', channel);
	}

	// New config for a channel
	@SubscribeMessage('changeChannel')
	async onChangeChannel(@ConnectedSocket() client: Socket, @MessageBody() body : ChannelPayload) {}

	@SubscribeMessage('quitChannel')
	async onQuitChannel(@ConnectedSocket() client: Socket, @MessageBody() body : ChannelPayload) {
		client.leave(String(body.id));
		this.server.emit('quitChannel', );
	}
}