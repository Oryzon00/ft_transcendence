import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthenticatedSocket } from "src/game/types/AuthenticatedSocket";
import { UserStatus } from "@prisma/client";
import { Server } from "socket.io";
import { StatusGateway } from "./status.gateaway";

@Injectable()
export class StatusService {
	constructor(private prisma: PrismaService, ) {}

	async handleConnection(client: AuthenticatedSocket) {
		console.log(`${client.username} connected`);
		this.prisma.user.update({
			where: {
				id: client.userId
			},
			data: {
				status: UserStatus.ONLINE
			}
		});
	}

	async handleDisconnect(client: AuthenticatedSocket) {
		console.log(`${client.username} disconnected`);
		this.prisma.user.update({
			where: {
				id: client.userId
			},
			data: {
				status: UserStatus.OFFLINE
			}
		});
	}
}
