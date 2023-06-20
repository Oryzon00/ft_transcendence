import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	
}
