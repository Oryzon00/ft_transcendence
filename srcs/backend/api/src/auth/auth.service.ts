import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async signup(dto: AuthDto) {
		try {
			const hash = await argon.hash(dto.password);
			const user = await this.prisma.user.create({
				data: {
					name: dto.name,
					password: hash
				}
			});
			delete user.password;
			return user;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002")
					throw new ForbiddenException("Credentials taken");
			}
			throw error;
		}
	}

	signin() {
		return "signin route";
	}
}
