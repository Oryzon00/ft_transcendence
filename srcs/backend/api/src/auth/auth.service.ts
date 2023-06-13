import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

// import * as argon from "argon2";
import { Prisma, User } from "@prisma/client";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import * as process from "process";
import { UserData42Dto } from "./dto/userData42.dto";
import { JwtService } from "@nestjs/jwt";
import { TokenDto } from "./dto/token.dto";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private httpService: HttpService,
		private jwt: JwtService
	) {}

	async getToken42(code: string) {
		const requestConfig: AxiosRequestConfig = {
			params: {
				grant_type: "authorization_code",
				client_id: process.env.API42_UID,
				client_secret: process.env.API42_SECRET,
				code: code,
				redirect_uri: "http://localhost:8000/auth"
			}
		};
		const responseData = await lastValueFrom(
			this.httpService
				.post("https://api.intra.42.fr/oauth/token", null, requestConfig)
				.pipe(
					map((response: AxiosResponse) => {
						return response.data;
					})
				)
		);
		return responseData;
	}

	async getUserData42(token: any): Promise<UserData42Dto> {
		const requestConfig: AxiosRequestConfig = {
			headers: {
				Authorization: `Bearer ${token.access_token}`
			}
		};
		const responseData = await lastValueFrom(
			this.httpService.get("https://api.intra.42.fr/v2/me", requestConfig).pipe(
				map((response: AxiosResponse) => {
					return response.data;
				})
			)
		);
		const userData42: UserData42Dto = {
			id: responseData.id,
			login: responseData.login
		};
		return userData42;
	}

	async login(userData42: UserData42Dto): Promise<User> {
		try {
			const user = await this.prisma.user.create({
				data: {
					name: userData42.login,
					id42: Number(userData42.id)
				}
			});
			return user;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(error.code);
				if (error.code === "P2002") {
					const user = await this.prisma.user.findUnique({
						where: {
							id42: Number(userData42.id)
						}
					});
					return user;
				}
			} else throw error;
		}
	}

	async signToken(user: User): Promise<TokenDto> {
		const payload = {
			sub: user.id,
			name: user.name
		};

		const token = await this.jwt.signAsync(payload, {
			expiresIn: "60m",
			secret: process.env.JWT_SECRET
		});

		return {
			access_token: token
		};
	}

	async auth(code: string): Promise<TokenDto> {
		const token42 = await this.getToken42(code);
		if (!token42) throw new UnauthorizedException();

		const userData42 = await this.getUserData42(token42);
		if (!userData42) throw new UnauthorizedException();

		const user = await this.login(userData42);
		if (!user) throw new UnauthorizedException();
		const token = await this.signToken(user);
		return token;
	}
}
