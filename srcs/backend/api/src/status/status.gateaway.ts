import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { StatusService } from "./status.service";
import { AuthenticatedSocket } from "src/game/types/AuthenticatedSocket";

@WebSocketGateway({
	path: "/game"
})
export class StatusGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	constructor(private statusService: StatusService) {}

	@WebSocketServer()
	public server: Server;

	afterInit(server: Server): void {
		console.log("\n\n Init socket server status user \n\n");
	}

	handleConnection(client: AuthenticatedSocket, ...args: any[]): void {
		console.log("connection in status gateway");
		this.statusService.handleConnection(client);
	}

	handleDisconnect(client: AuthenticatedSocket): void {
		this.statusService.handleDisconnect(client);
	}
}
