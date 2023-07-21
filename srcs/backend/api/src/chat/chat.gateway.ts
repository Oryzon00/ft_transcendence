import { Injectable, OnModuleInit, UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WsException } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagePayload, ChannelPayload, ChannelInvitation, ChannelKick } from './dto/chat';
import { Channel, Member, Message, User } from '@prisma/client';
import ChannelDatabase from './database/channel';
import UserDatabase from './database/user';
import AdminDatabase from './database/admin';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AuthSocket } from './AuthSocket.types';
import { PrismaService } from 'src/prisma/prisma.service';


@UseGuards(JwtGuard)
@Injectable()
@WebSocketGateway({
	namespace: 'chat',
	cors: {
		origins: ['http://localhost:3000'],
	}
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{ 
	constructor(
		private channeldb : ChannelDatabase,
		private prisma : PrismaService,
	) {};

	@WebSocketServer()
	server : Server;
	socketList : {[key: string]: string};

	afterInit(server: any) {
		this.server.on('connection', (socket) => {
			console.log('init');
		})
		
	}
	async handleConnection(client : AuthSocket) {
		const channel : Member[] = await this.prisma.member.findMany({
			where: {
				userId: client.userId,
			},
		})
		channel.map((member) => {
			client.join(member.channelId);
		})
		client.join(String(client.userId))
	}

	async handleDisconnect() {/* Do nothing */}

	@SubscribeMessage('newMessage')
	async onNewMessage(@ConnectedSocket() client: AuthSocket, @MessageBody() body : MessagePayload) {
		// Confirmed the user 
		const member = await this.prisma.member.findMany({
			where: { 
				channelId: body.channelId,
				userId: client.userId
			 }
		});
		if (member == undefined) {
			throw new WsException(
				"You cannot send message in this channel, refresh the page",
			  );
		}
		body.authorId = client.userId;
		const res = await this.channeldb.stockMessages(body);
		this.server.to(String(body.channelId)).emit('onMessage', res);
	}

	@SubscribeMessage('joinChannel')
	async onJoinChannel(@ConnectedSocket() client: AuthSocket, @MessageBody() body : MessagePayload) {
		const member = await this.prisma.member.findMany({
			where: { 
				channelId: body.channelId,
				userId: client.userId
			 }
		});
		if (member == undefined) {
			throw new WsException(
				"You cannot join this channel, refresh the page",
			  );
		}
		client.join(body.channelId);
	}

	getSocketFromUserID(userId : number) : Socket
	{
		const sockets : Socket[] = Object.values(this.server.sockets.sockets);
		for (let i = 0; i < sockets.length; i++)
		{
			if (sockets[i].rooms.has(String(userId)))
				return (sockets[i]);
		}
		return (undefined)

	}

	@SubscribeMessage('inviteChannel')
	async onInviteChannel(@ConnectedSocket() client: AuthSocket, @MessageBody() body : ChannelInvitation) {
		const member = await this.prisma.member.findMany({
			where: { 
				channelId: body.id,
				userId: body.invited,
			 }
		});
		if (member == undefined) {
			throw new WsException(
				"The user invite is not in the channel, refresh the page",
			  );
		}
		const socket : Socket = this.getSocketFromUserID(body.invited);
		if (socket != undefined)
			socket.join(body.id);
	}
	@SubscribeMessage('leaveChannel')
	async onLeaveChannel(@ConnectedSocket() client : AuthSocket, @MessageBody() body : MessagePayload) {
		client.leave(body.channelId)
	}

	@SubscribeMessage('ejectChannel')
	async onEjectChannel(@ConnectedSocket() client : AuthSocket, @MessageBody() body : ChannelKick) {
		if (this.prisma.member.findFirst({
			where: {
				userId: body.invited,
				channelId: body.id,
			}
		}) == undefined)
		{
		const socket = this.getSocketFromUserID(body.invited);
		if (socket != undefined)
			socket.leave(body.id)
			this.server.to(body.id).emit('onModeration', {id: body.id})
		}
	}
}