import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
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
	private server: Server;

	afterInit(server: Server): void {
		console.log("Status websocket server init");
	}

	async handleConnection(
		client: AuthenticatedSocket,
		...args: any[]
	): Promise<void> {
		this.statusService.handleConnection(client);
	}

	async handleDisconnect(client: AuthenticatedSocket): Promise<void> {
		this.statusService.handleDisconnect(client);
	}
}

// IoAdapter("localhost3000", {
// 	transport: {
// 		polling: {
// 			Authorization: "Bearer " + getJWT
// 		}
// 	}
// });
