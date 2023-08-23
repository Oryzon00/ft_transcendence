import { Injectable } from "@nestjs/common";
import { GameProfile, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { GameGateway } from "./game.gateway";
import { AuthenticatedSocket } from "./types/AuthenticatedSocket";

@Injectable()
export class GameService {
	constructor(
		private gameGateway: GameGateway,
		private prisma: PrismaService) {}

	async getGameProfile(user: User): Promise<GameProfile> {
		return await this.prisma.gameProfile.findUnique({where: {userId: user.id}})
	}

	async updateSocket(user: User, socket: AuthenticatedSocket) {
		const updateGameProfile = await this.prisma.gameProfile.update({
			where: {
				userId: user.id,
			},
			data: {
				playSocketId: socket.id
			},
		});
	}
}