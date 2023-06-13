import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { TokenDto } from "./dto/token.dto";
import { query } from "express";
import { UnauthorizedException } from "@nestjs/common";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	// @Get()
	// async auth(
	// 	@Query() query: { code: string; error: string }
	// ): Promise<TokenDto> {
	// 	if (query.error === undefined && query.code !== undefined) {
	// 		const token = await this.authService.auth(query.code);
	// 		return token;
	// 	}
	// 	//else throw error?
	// }

	@Post()
	async auth(@Body() body: AuthDto): Promise<TokenDto> {
		if (body.error !== undefined) {
			throw new UnauthorizedException(); 
		}
		const token = await this.authService.auth(body.code);
		return token;
	}

}
