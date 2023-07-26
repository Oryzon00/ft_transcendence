import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { UserSafeDTO } from "./dto";
import * as fs from "fs";
import { Buffer } from "buffer";
import { join } from "path";
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
		const oldPath = user.image.split(`http://${process.env.SERVER_HOSTNAME}:3000/images/`)[1]
		if (oldPath && oldPath.split('.')[1] != type.split('/')[1])
			fs.unlink(join(process.cwd(), 'images', oldPath), (err) => {});

		let imagePath = new Promise(function (resolve, reject) {
			fs.writeFile(join(process.cwd(), 'images', user.id + '.' + type.split('/')[1]), buf, async (err) => {
				if (err) reject(err);
				else {
					resolve("lol");
				}
			});
		})
			.then (() => {
				return (`http://${process.env.SERVER_HOSTNAME}:3000/images/` + user.id + "." + type.split('/')[1]) // Possibilité de mettre le path dans le resolve au lieu de .then
		})
		 return (imagePath.then( async (val) => {
			 await this.prisma.user.update({
				 where: {
					 id: user.id
				 },
				 data: {
					 image: val
				 }
			 });
			 return { image: val };
		 }));
	}


	async updateUserName(
		user: User,
		newName: string
	): Promise<{ name: string }> {
		try {
			await this.prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					name: newName
				}
			});
			return { name: newName };
		} catch (error) {
			throw new UnauthorizedException();
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
