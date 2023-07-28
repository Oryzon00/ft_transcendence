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

@Injectable()
@WebSocketGateway({
	cors: {
		origins: ["http://localhost:3000"]
	}
})
export class ChatGateway implements OnModuleInit {
	constructor(
		private userdb: UserDatabase,
		private channeldb: ChannelDatabase,
		private prisma: PrismaService
	) {}

	@WebSocketServer()
	public server: Server;

	onModuleInit() {
		this.server.on("connection", (socket: Socket) => {});
	}

	@SubscribeMessage("authenticate")
	async authenticate(
		@ConnectedSocket() client: AuthSocket,
		@MessageBody() body
	) {
		if (body != null && Object.keys(body).length > 0) {
			client.userId = body.id;
			client.name = body.name;
			const members: Member[] = await this.userdb.getMembers(body.id);
			if (!members) return;
			members.map((rooms) => client.join(rooms.channelId));
			client.join(String(body.id));
		}
	}

	async onJoinChannel(userId: number, channelId: string) {
		const socket = await this.getSocketFromUserID(String(userId));
		if (!socket) return null;
		socket.join(channelId);
	}

	async getSocketFromUserID(userId: string): Promise<Socket> {
		return await this.server.in(userId).fetchSockets()[0];
	}

	async emitToRoom(room: string, message: MessagePayload, status: string) {
		console.log(
			"message:",
			message,
			await this.server.in(room).fetchSockets()
		);
		this.server.to(room).emit(status, message);
	}

	async onLeaveChannel(userId: number, channelId: string) {
		const socket = await this.getSocketFromUserID(String(userId));
		if (!socket) return null;
		socket.leave(channelId);
	}
}
