import {
	Body,
	Controller,
	Post,
	Patch,
	UseGuards,
	BadGatewayException
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TokenDto } from "./dto/token.dto";
import { UnauthorizedException } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { UserSafeDTO } from "src/user/dto";

@Controller("auth")
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService
	) {}

	@Post()
	async auth(@Body() body): Promise<TokenDto | UserSafeDTO> {
		if (body.error || !body.code) throw new UnauthorizedException();
		const token42 = await this.authService.getToken42(body.code);
		if (!token42) throw new BadGatewayException();
		console.log(token42);
		const userData42 = await this.authService.getUserData42(token42);
		if (!userData42) throw new BadGatewayException();

		const user = await this.authService.login(userData42);

		if (user.is2FAOn) {
			return this.userService.getUserSafe(user);
		} else {
			return await this.authService.signToken(user);
		}
	}

	@Post("2FA/verify")
	async verifyTOTP(@Body() body): Promise<TokenDto> {
		const trueUser = await this.userService.getTrueUser(body.user);
		const isOTPValid = await this.authService.verifyTOTPValid(
			trueUser,
			body.OTP
		);
		if (!isOTPValid) throw new UnauthorizedException();
		return await this.authService.signToken(body.user);
	}

	@UseGuards(JwtGuard)
	@Post("2FA/generate")
	async generate2FA(@GetUser() user: User): Promise<{ qrCodeUrl: string }> {
		const otpAuthUrl = await this.authService.generate2FASecretQRCode(user);
		const qrCodeUrl = await this.authService.generateQRCodeDataURL(
			otpAuthUrl
		);
		return {
			qrCodeUrl
		};
	}
	@UseGuards(JwtGuard)
	@Patch("2FA/turn-on")
	async turnOn2FA(
		@GetUser() user: User,
		@Body() body
	): Promise<{ status: boolean }> {
		if (!user.secret2FA) throw new UnauthorizedException();
		const isTOTPValid = await this.authService.verifyTOTPValid(
			user,
			body.TOTP
		);
		if (!isTOTPValid) throw new UnauthorizedException();
		const status = await this.authService.turnOnOff2FA(user, true);

		return { status: status };
	}

	@UseGuards(JwtGuard)
	@Patch("2FA/turn-off")
	async turnOff2FA(@GetUser() user: User): Promise<{ status: boolean }> {
		const status = await this.authService.turnOnOff2FA(user, false);
		return { status: status };
	}
}
