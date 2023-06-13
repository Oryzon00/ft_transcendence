import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { TokenDto } from "./dto/token.dto";
import { query } from "express";
import { UnauthorizedException } from "@nestjs/common";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	async auth(@Body() body: AuthDto): Promise<TokenDto> {
		const token = await this.authService.auth(body.code);
		return token;
	}

}
