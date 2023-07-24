import { Body, ExecutionContext, Get, Injectable, OnModuleInit, UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WsException } from '@nestjs/websockets';
import { Namespace, Socket, Server } from 'socket.io';
import socketioJwt from 'socketio-jwt'
import { MessagePayload, ChannelPayload, ChannelInvitation, ChannelKick } from './dto/chat';
import { Channel, Member, Message, User } from '@prisma/client';
import ChannelDatabase from './database/channel';
import UserDatabase from './database/user';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUser } from 'src/auth/decorator';
import { AuthSocket } from './AuthSocket.types';


@Injectable()
@WebSocketGateway({
	cors: {
		origins: ['http://localhost:3000'],
	}
})
export class ChatGateway 
	implements OnModuleInit{ 
	constructor(
		private userdb : UserDatabase,
		private channeldb : ChannelDatabase,
		private prisma : PrismaService,
	) {};

	@WebSocketServer()
	public server : Server;


	onModuleInit() {
		this.server.on('connection', (socket: AuthSocket) => {})
	}

	@SubscribeMessage('authenticate')
	async authenticate(@ConnectedSocket() client : AuthSocket, @MessageBody() body) {
		if (body != null)
		{
			client.userId = body.id;
			client.name = body.name;
			const members : Member[] = await this.userdb.getMembers(body.id);
			if (!members) return;
			members.map((rooms) =>
				client.join(rooms.channelId)
			)
			client.join(body.name);
		}
	}

	async onJoinChannel(username: string, channelId: string) {
		const socket = this.getSocketFromUserID(username)
		if (!socket) return null;
		socket.join(channelId);
	}

	getSocketFromUserID(userId : string) : Socket
	{
		const socketId = this.server.of('/').adapter.rooms.get(userId).values().next().value;
		return (this.server.sockets.sockets[socketId])
	}

	async onLeaveChannel(username: string, channelId: string) {
		const socket = this.getSocketFromUserID(username)
		if (!socket) return null;
		socket.leave(channelId);
	}

	emitToRoom(room : string, message : MessagePayload, status: string) {
		console.log(message);
		this.server.to(room).emit(status, message);
	}
}