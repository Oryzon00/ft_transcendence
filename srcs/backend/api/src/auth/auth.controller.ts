import { Body, Controller, Post, Patch, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TokenDto } from "./dto/token.dto";
import { UnauthorizedException } from "@nestjs/common";
import { Jwt2FAGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	async auth(@Body() body): Promise<TokenDto> {
		if (body.error || !body.code) throw new UnauthorizedException();

		const token42 = await this.authService.getToken42(body.code);
		if (!token42) throw new UnauthorizedException();

		const userData42 = await this.authService.getUserData42(token42);
		if (!userData42) throw new UnauthorizedException();

		const user = await this.authService.login(userData42);

		if (user.twoFA) {
			const isTokenValid = this.authService.verifyTOTPValid(
				user,
				body.TOTP
			);
			if (!isTokenValid) throw new UnauthorizedException();
			return await this.authService.signToken(user, true);
		} else {
			return await this.authService.signToken(user, false);
		}
	}

	@UseGuards(Jwt2FAGuard)
	@Patch("twoFA/turn-on")
	async turnOnTwoFA(
		@GetUser() user: User,
		@Body() body
	): Promise<{ status: boolean }> {
		const isTokenValid = this.authService.verifyTOTPValid(
			user,
			body.TOTP
		);
		if (!isTokenValid) throw new UnauthorizedException();
		const status = await this.authService.turnOnOffTwoFA(user, true);
		return { status: status };
	}

	@UseGuards(Jwt2FAGuard)
	@Get("twoFA/generate") //POST? 
	async generateTwoFA(@GetUser() user: User) {
		const obj = await this.authService.generateTwoFASecret(user);
		const twoFASecret = obj.twoFASecret;
		const qrCodeUrl = this.authService.generateQRCodeDataURL(
			obj.otpAuthUrl
		);

		return {
			twoFASecret, //envoyer secret dans payload token ? non necessaire?
			qrCodeUrl
		};
	}


}
