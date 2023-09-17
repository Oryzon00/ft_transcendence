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
import { verify } from "jsonwebtoken";
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
import { JwtPayload } from "src/auth/dto/jwtPayload.dto";

@Injectable()
@WebSocketGateway({
	cors: {
		origins: ["http://localhost:3000"]
	}
})
export class ChatGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	public server: Server;

	afterInit(server: Server) {
		server.on("connection", (socket: Socket) => {});
	}

	getId(client: AuthSocket) : number{
		if (client.handshake.headers.authorization == undefined) return null

		try {

			const decoded: string | JwtPayload | any = verify(
				client.handshake.headers.authorization.split(' ')[1],
				process.env.JWT_SECRET
			);
			return (decoded.sub)
		} catch (ex) {
			console.log("ERROR");
		}
	}

	async handleConnection(@ConnectedSocket() client: AuthSocket) {
		console.log('connection');
		client.join(String(this.getId(client)));
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
