import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
// import * as argon from "argon2";
import { Prisma, User } from "@prisma/client";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";
import { AxiosRequestConfig } from "axios";
import * as process from "process";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private httpService: HttpService
	) {}

	async signup(dto: AuthDto) {
		try {
			// const hash = await argon.hash(dto.password);
			const user = await this.prisma.user.create({
				data: {
					name: dto.name
				}
			});
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

	async createUser(id42: string, name: string): Promise<User> {
		try {
			const user = await this.prisma.user.create({
				data: {
					name: name,
					id42: Number(id42)
				}
			});
			return user;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					const user = await this.prisma.user.findUnique({
						where: {
							id42: Number(id42),
							name: name
						}
					});
				}
			}
			throw error;
		}
	}
	//////////////////////////////////////////////////////////////////////////////////////////////

	async authUser(code: string): Promise<User> {
		const requestConfig: AxiosRequestConfig = {
			params: {
				grant_type: "authorization_code",
				client_id:
					"u-s4t2ud-cffa8a7def1804e4f9b3265068605197c756e7a8beff3450a17722f02f1d15e0",
				client_secret: process.env.API_SECRET, // NE JAMAIS PUSH SECRET
				code: code,
				redirect_uri: "http://localhost:8000/auth"
			}
		};

		const responseData = await lastValueFrom(
			this.httpService
				.post(
					"https://api.intra.42.fr/oauth/token",
					null,
					requestConfig
				)
				.pipe(
					//pourquoi?
					map((response) => {
						return response.data;
					})
				)
		);
		console.log("--- Token ---");
		console.log(responseData);
		const requestConfig2: AxiosRequestConfig = {
			headers: {
				Authorization: `Bearer ${responseData.access_token}`
			}
		};

		const responseData2 = await lastValueFrom(
			this.httpService
				.get("https://api.intra.42.fr/v2/me", requestConfig2)
				.pipe(
					//?
					map((response) => {
						//?
						return response.data;
					})
				)
		);
		console.log("--- Public Data ---");
		console.log(responseData2.login);
		console.log(responseData2.id);

		//if not create user
		// if (user === null) {
		// 	user = this.createUser(responseData2.id, responseData2.login);
		// }

		let user;
		try {
			user = await this.prisma.user.create({
				data: {
					name: responseData2.login,
					id42: Number(responseData2.id)
				}
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					user = await this.prisma.user.findUnique({
						where: {
							id42: Number(responseData2.id)
						}
					});
				}
			} else throw error;
		}
		return user;
	}
}
