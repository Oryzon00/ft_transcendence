import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthenticatedSocket } from "src/game/types/AuthenticatedSocket";
import { UserStatus } from "@prisma/client";
import { StatusGateway } from "./status.gateaway";

@Injectable()
export class StatusService {
	constructor(private prisma: PrismaService, ) {}

	//bug si inclut
	// private statusGateway: StatusGateway
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
		// this.statusGateway.server.emit(event, playload);
		//emit connect: username
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
