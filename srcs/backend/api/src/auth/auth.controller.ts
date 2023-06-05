import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get() //changer en POST
	auth(@Query() query: { code: string, error: string}) : Promise<User> {
		if (query.error === undefined && query.code !== undefined) {
			const result = this.authService.auth(query.code);
			return (result);
		}
		//else throw error?
	}

	@Post("signup")
	signup(@Body() dto: AuthDto) {
		console.log(dto);
		return this.authService.signup(dto);
	}

	@Post("signin")
	signin() {
		return this.authService.signin();
	}
}
