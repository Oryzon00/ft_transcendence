import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AppService {
	constructor(private prisma: PrismaService) {} //AppService a access atout PrismaService

	async getHello(): Promise<string> {
		return ("Hello world!");
	}

	async getNbUsers() : Promise<number> {
		const nbUser = await this.prisma.user.count();
		return nbUser;
	}

	// async getUsers(): Promise<User[]> {
	// 	if (await this.prisma.user.count() > 0)
	// 	{
	// 		const users = await this.prisma.user.findMany
	// 		return users;
	// 	}
	// }
}
