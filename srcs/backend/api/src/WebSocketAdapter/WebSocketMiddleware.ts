import { AuthenticatedSocket } from "src/game/types/AuthenticatedSocket";
import { PrismaService } from "src/prisma/prisma.service";
import * as jwt from "jsonwebtoken";
import { Socket } from "socket.io";

type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void;

function WebSocketUserMiddleware(prisma: PrismaService): SocketMiddleware {
	return async (socket: Socket, next) => {
		const authSocket = socket as AuthenticatedSocket;
		try {
			const token: string =
				socket.handshake.headers.authorization.split(" ")[1];
			const jwtData: any = jwt.verify(token, process.env.JWT_SECRET);
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					name: jwtData.name
				},
			});
			authSocket.username = user.name;
			authSocket.userId = user.id;
			next();
		} catch (error) {
			next({
				name: "Unauthorized",
				message: "Socket Unauthorized"
			});
		}
	};
}

export default WebSocketUserMiddleware;
