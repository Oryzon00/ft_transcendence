import {
	Body,
	ExecutionContext,
	Get,
	Injectable,
	OnModuleInit,
	UseFilters,
	UseGuards
} from "@nestjs/common";
import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	WebSocketServer,
	ConnectedSocket,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WsException
} from "@nestjs/websockets";
import { Namespace, Socket, Server } from "socket.io";
import socketioJwt from "socketio-jwt";
import {
	MessagePayload,
	ChannelPayload,
	ChannelInvitation,
	ChannelKick
} from "./dto/chat";
import { Channel, Member, Message, User } from "@prisma/client";
import ChannelDatabase from "./database/channel";
import UserDatabase from "./database/user";
import { JwtGuard } from "src/auth/guard";
import { PrismaService } from "src/prisma/prisma.service";
import { GetUser } from "src/auth/decorator";
import { AuthSocket } from "./AuthSocket.types";
import { WsGuard } from "./WsGuard";

@Injectable()
@WebSocketGateway({
	cors: {
		origins: ["http://localhost:3000"]
	}
})
export class ChatGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	constructor(
		private userdb: UserDatabase,
		private channeldb: ChannelDatabase,
		private prisma: PrismaService
	) {}

	@WebSocketServer()
	public server: Server;

	afterInit(server: Server) {
		this.server.on("connection", (socket: Socket) => {});
	}

	@UseGuards(WsGuard)
	async handleConnection(@ConnectedSocket() client: AuthSocket) {
		console.log("connection");
		client.join(String(client.userId));
	}

	async handleDisconnect(@ConnectedSocket() client: AuthSocket) {
		console.log("disconnect");
		client.leave(String(client.userId));
	}

	async emitToRoom(users: Member[], message: MessagePayload, status: string) {
		users.map((user) => {
			console.log(
				`this.server.to(String(${user.userId})).emit(${status}, ${message.content});`
			);
			this.server.to(String(user.userId)).emit(status, message);
		});
	}
}
