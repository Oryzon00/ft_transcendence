import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";
import { PrismaService } from "src/prisma/prisma.service";
import WebSocketUserMiddleware from "./WebSocketMiddleware";

export class WebSocketAdapter extends IoAdapter {
	constructor(private app: INestApplicationContext) {
		super(app);
	}

	createIOServer(port: number, options?: any) {
		const cors = {
			credentials: true,
			origin: ["http://localhost:8000"],
			methods: ["GET", "POST"],
			allowedHeaders: ['Authorization'],
		};
		const optionsWithCors: ServerOptions = {
			...options,
			cors
		};
		const server = super.createIOServer(port, optionsWithCors);
		const prismaService = this.app.get(PrismaService);

		server.use(WebSocketUserMiddleware(prismaService));
		return server;
	}
}
