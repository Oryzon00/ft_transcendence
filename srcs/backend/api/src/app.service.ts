import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AppService {
	constructor(private prisma: PrismaService) {}

	async getHello(): Promise<string> {
		return "Hello world!";
	}

	async getNbUsers(): Promise<number> {
		const nbUser = await this.prisma.user.count();
		return nbUser;
	}

	async getUsers(): Promise<User[]> {
		const users = await this.prisma.user.findMany();
		return users;
	}

	async getUserByName(NAME: string): Promise<User> {
		const user = await this.prisma.user.findFirst({
			where: {
				name: NAME
			}
		});
		return user;
	}

	async getUserById(id: number): Promise<User> {
		const user = await this.prisma.user.findFirst({
			where: {
				id: id
			}
		});
		return user;
	}
}
