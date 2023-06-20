import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import * as process from "process";
import { UserData42Dto } from "./dto/userData42.dto";
import { JwtService } from "@nestjs/jwt";
import { TokenDto } from "./dto/token.dto";
import { authenticator } from "otplib";
import { TwoFADto } from "./dto/twoFA.dto";
import { toDataURL } from "qrcode";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private httpService: HttpService,
		private jwt: JwtService
	) {}

	/* 2FA */

	async generateTwoFASecret(user: User): Promise<TwoFADto> {
		const twoFASecret = authenticator.generateSecret();
		const otpAuthUrl = authenticator.keyuri(
			user.name,
			"Transcendance",
			twoFASecret
		);
		try {
			await this.prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					twoFASecret: twoFASecret
				}
			});
		} catch {
			throw new InternalServerErrorException();
		}
		return {
			twoFASecret,
			otpAuthUrl
		};
	}

	async generateQRCodeDataURL(otpAuthUrl: string): Promise<String> {
		return toDataURL(otpAuthUrl);
	}

	checkTwoFATokenValid(user: User, twoFAToken: string): boolean {
		return authenticator.verify({
			token: twoFAToken,
			secret: user.twoFASecret
		});
	}

	async turnOnOffTwoFA(user: User, status: boolean) {
		try {
			await this.prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					twoFA: status
				}
			});
		} catch {
			throw new InternalServerErrorException();
		}
		return status;
	}

	/* ---------------------------------------------------------------------------------------------- */

	/* AUTH */

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
				.post(
					"https://api.intra.42.fr/oauth/token",
					null,
					requestConfig
				)
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
			this.httpService
				.get("https://api.intra.42.fr/v2/me", requestConfig)
				.pipe(
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
		let user: User;
		try {
			user = await this.prisma.user.create({
				data: {
					name: userData42.login,
					id42: userData42.id
				}
			});
			
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					user = await this.prisma.user.findUnique({
						where: {
							id42: userData42.id
						}
					});
				}
			} else throw error;
		}
		
		return user;
	}

	async signToken(user: User): Promise<TokenDto> {
		const payload = {
			sub: user.id,
			name: user.name,
			twoFA: user.twoFA
		};

		const token = await this.jwt.signAsync(payload, {
			expiresIn: "60m",
			secret: process.env.JWT_SECRET
		});

		return {
			access_token: token
		};
	}
}
