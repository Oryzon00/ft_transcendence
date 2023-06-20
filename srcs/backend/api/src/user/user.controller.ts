import { Patch, Controller, Get, UseGuards, Body } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}
	@Get("me")
	getMe(@GetUser() user: User) {
		return user;
	}

	@Patch("twoFA")
	async upDateTwoFAStatus(
		@GetUser() user: User,
		@Body() body
	): Promise<{ status: boolean }> {
		const status = await this.userService.turnOnOffTwoFA(user, body.status);
		return { status: status };
	}
}
