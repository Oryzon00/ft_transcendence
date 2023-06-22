import { Body, Controller, Post, Patch, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TokenDto } from "./dto/token.dto";
import { UnauthorizedException } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	async auth(@Body() body): Promise<TokenDto | { user: User }> {
		if (body.error || !body.code) throw new UnauthorizedException();

		const token42 = await this.authService.getToken42(body.code);
		if (!token42) throw new UnauthorizedException();

		const userData42 = await this.authService.getUserData42(token42);
		if (!userData42) throw new UnauthorizedException();

		const user = await this.authService.login(userData42);

		if (user.twoFA) {
			return { user };
		} else {
			return await this.authService.signToken(user);
		}
	}

	@Post("twoFA/verify")
	async verifyTOTP(@Body() body): Promise<TokenDto> {
		const isTOTPValid = this.authService.verifyTOTPValid(
			body.user,
			body.TOTP
		);
		if (!isTOTPValid) throw new UnauthorizedException();
		return await this.authService.signToken(body.user);
	}

	@UseGuards(JwtGuard)
	@Post("twoFA/generate")
	async generateTwoFA(@GetUser() user: User): Promise<{ qrCodeUrl: string }> {
		const otpAuthUrl = await this.authService.generateTwoFASecretQRCode(
			user
		);
		const qrCodeUrl = await this.authService.generateQRCodeDataURL(
			otpAuthUrl
		);
		return {
			qrCodeUrl
		};
	}

	@UseGuards(JwtGuard)
	@Patch("twoFA/turn-on")
	async turnOnTwoFA(
		@GetUser() user: User,
		@Body() body
	): Promise<{ status: boolean }> {
		const isTOTPValid = this.authService.verifyTOTPValid(user, body.TOTP);
		if (!isTOTPValid) throw new UnauthorizedException();
		const status = await this.authService.turnOnOffTwoFA(user, true);
		return { status: status };
	}

	@UseGuards(JwtGuard)
	@Patch("twoFA/turn-off")
	async turnOffTwoFA(@GetUser() user: User): Promise<{ status: boolean }> {
		const status = await this.authService.turnOnOffTwoFA(user, false);
		return { status: status };
	}

	
}
