import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { UserSafeDTO } from "./dto";
@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getUserSafe(user: User): UserSafeDTO {
		let userSafe = user;
		delete userSafe.id42;
		delete userSafe.secret2FA;
		return userSafe;
	}

	async getTrueUser(user: UserSafeDTO): Promise<User> {
		const trueUser = await this.prisma.user.findUnique({
			where: {
				id: user.id
			}
		});
		return trueUser;
	}

	async updateUserImage(user: User, newImage: string): Promise<string> {
		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				image: newImage
			}
		});
		return newImage;
	}

	async updateUserName(user: User, newName: string): Promise<string> {
		try {
			await this.prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					name: newName
				}
			});
			return newName;
		} catch {
			throw new ForbiddenException();
		}
	}

	async findUser(username: string): Promise<UserSafeDTO> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					name: username
				}
			});
			return this.getUserSafe(user);
		} catch {
			throw new NotFoundException();
		}
	}
}
