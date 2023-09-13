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
	cors: {
		//{ cors: true }?
		origins: ["http://localhost:3000"]
	}
})
export class StatusGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	constructor(private statusService: StatusService) {}

	@WebSocketServer()
	public server: Server;

	afterInit(server: Server): void {
		console.log("\n\n\nStatus websocket server init\n\n\n");
	}

	handleConnection(client: AuthenticatedSocket, ...args: any[]): void {
		this.statusService.handleConnection(client);
	}

	handleDisconnect(client: AuthenticatedSocket): void {
		this.statusService.handleDisconnect(client);
	}

	@SubscribeMessage("test")
	handleEvent(@MessageBody() data: string): string {
		console.log("\n Message received, mirror message sent\n");
		return data;
	}
}
