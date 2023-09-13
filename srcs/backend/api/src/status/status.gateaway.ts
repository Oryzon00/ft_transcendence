// import {
// 	OnGatewayConnection,
// 	OnGatewayDisconnect,
// 	WebSocketGateway,
// 	WebSocketServer
// } from "@nestjs/websockets";
// import { Server, Socket } from "socket.io";
// import * as jwt from "jsonwebtoken";

// @WebSocketGateway({
// 	cors: {
// 		origins: ["http://localhost:3000"]
// 	}
// })
// export class StatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
// 	constructor() {}

// 	@WebSocketServer()
// 	private server: Server;

// 	async handleConnection(client: Socket, ...args: any[]): Promise<void> {
// 		const clientToken = client.handshake.headers.authorization.split(" ")[1];
// 		const jwtDecoded = jwt.verify(clientToken, process.env.JWT_SECRET);
		
// 	}

// 	async handleDisconnect(client: Socket): Promise<void> {}
// }

// IoAdapter("localhost3000", {
// 	transport: {
// 		polling: {
// 			Authorization: "Bearer " + getJWT
// 		}
// 	}
// });
// try {
// 	const jwt: string = client.handshake.headers.authorization.split(" ")[1];
// 	const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
// 	const AClient: AuthenticatedSocket = client as AuthenticatedSocket;
// 	console.log("test");
// 	console.log(decoded.name);

// 	const resp = await this.prisma.user.findUnique({
// 		where: {
// 			name: decoded.name
// 		}
// 	});
// 	console.log(resp);
// 	AClient.user = resp;
// 	this.lobbyManager.initSocket(AClient);
// } catch (err) {
// 	client._error("Unauthorized");
// 	client.disconnect();
// }
