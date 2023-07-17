import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { UserSafeDTO } from "./dto";
import * as fs from "fs";
import {Buffer} from 'buffer';
import {join} from 'path';
import * as process from "process";

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

	async updateUserImage(
		user: User,
		type: string,
		base64Data: string
	): Promise<{ image: string }> {

		let buf = Buffer.from(base64Data.split(',')[1], 'base64');
		const oldPath = user.image.split('http://localhost:3000/images/')[1]
		if (oldPath)
			fs.unlink(join(process.cwd(), 'images', oldPath), (err) => {});

		fs.writeFile(join(process.cwd(), 'images', user.id + '.' + type.split('/')[1]), buf, (err) => {
			if (err) throw err;
		});



		const imagePath = "http://localhost:3000/images/" + user.id + "." + type.split('/')[1];

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				image: imagePath
			}
		});
		return { image: imagePath };
	}

	async updateUserName(
		user: User,
		newName: string
	): Promise<{ name: string }> {
		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				name: newName
			}
		});
		return { name: newName };
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
