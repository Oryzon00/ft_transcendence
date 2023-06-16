import { Injectable, InternalServerErrorException,  } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async turnOnOffTwoFA(user: User, status: boolean) {
		try {
			await this.prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					twoFA: status
				}
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}
}
