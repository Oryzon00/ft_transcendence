import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
// import { User } from "@prisma/client";

@Injectable()
export class AppService {
	// constructor(private prisma: PrismaService) {} //AppService a access atout PrismaService

	// async getHello(): Promise<User[]> {
		// Call DB
		// const users = await this.prisma.user.findMany();
		// console.log(users);
		// return users;
	// }
}
