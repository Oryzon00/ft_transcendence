import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagePayload, ChannelPayload } from './chat';
import { Channel, Member, Message } from '@prisma/client';
import ChannelDatabase from './database/channel';
import UserDatabase from './database/user';
import AdminDatabase from './database/admin';
import { GetUser } from 'src/auth/decorator';

@WebSocketGateway({
	cors: {
		origins: ['http://localhost:3000'],
	}
})

/*
	Function for the chat socket
	sendMessage
*/
export class ChatGateway implements OnModuleInit{ 
	constructor(
		private channeldb : ChannelDatabase,
		private userdb : UserDatabase,
		private admindb : AdminDatabase,
	) {};

	@WebSocketServer()
	server : Server;

	socketList : string[]
	onModuleInit() {
		this.server.on('connection', (socket) => {
			console.log('connected ', socket.id);
		});
	}

	@SubscribeMessage('newMessage')
	async onNewMessage(@ConnectedSocket() client: Socket, @MessageBody() body : MessagePayload) {
		const res = await this.channeldb.stockMessages(body);
		this.server.to(String(body.channelId)).emit('onMessage', res);
	}

	/*
	@SubscribeMessage('newChannel')
	async onNewChannel(@ConnectedSocket() client: Socket, @MessageBody() body : ChannelPayload) {
		let channel : Channel = await this.channeldb.createChannel(body);
		client.join(String(channel.id));
		this.server.to(String(channel.id)).emit('onChannel', channel);
	}

	@SubscribeMessage('quitChannel')
	async onQuitChannel(@ConnectedSocket() client: Socket, @MessageBody() body : ChannelPayload) {
		client.leave(String(body.id));
		this.server.to(String(body.id)).emit('quitChannel', {});
	}
	*/
}