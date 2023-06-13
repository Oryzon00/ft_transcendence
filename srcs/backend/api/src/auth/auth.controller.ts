import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { User } from "@prisma/client";
import { TokenDto } from "./dto/token.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get() //changer en POST
	async auth(@Query() query: { code: string, error: string} ) : Promise<TokenDto> {
		if (query.error === undefined && query.code !== undefined) {
			const token = await this.authService.auth(query.code);
			console.log("token: ");
			console.log(token);
			return (token);
		}
		//else throw error?
	}

	@Post("signup")
	signup(@Body() dto: AuthDto) {
		console.log(dto);
		return this.authService.signup(dto);
	}
}
