import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getUserSafe(user: User) {
		let userSafe = user;
		delete userSafe.id42;
		delete userSafe.secret2FA;
		return userSafe;
	}

	async getTrueUser(user: User) : Promise<User> {
		const trueUser = await this.prisma.user.findUnique({
			where: {
				id: user.id
			}
		});
		return trueUser;
	}
}
