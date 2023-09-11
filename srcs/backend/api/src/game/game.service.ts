import { Injectable } from "@nestjs/common";
import { GameProfile, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { GameGateway } from "./game.gateway";
import { AuthenticatedSocket } from "./types/AuthenticatedSocket";

@Injectable()
export class GameService {
	constructor(
		private prisma: PrismaService) {}

	async getGameProfile(user: User): Promise<GameProfile> {
		return await this.prisma.gameProfile.findUnique({where: {userId: user.id}})
	}

	async updateSocket(user: User, socket: AuthenticatedSocket) {
		console.log(user);
		const updateGameProfile = await this.prisma.gameProfile.upsert({
			where: {
				userId: user.id,
			},
			update: {
				playSocketId: socket.id,
			},
			create: {
				playSocketId: socket.id,
				userId: user.id
			}
		});
		console.log("test2");

	}
}