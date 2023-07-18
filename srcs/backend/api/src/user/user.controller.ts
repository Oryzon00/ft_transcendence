import { Patch, Controller, Get, UseGuards, Body, Query } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { UserService } from "./user.service";
import { UserSafeDTO } from "./dto";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}
	@Get("me")
	getMe(@GetUser() user: User): UserSafeDTO {
		return this.userService.getUserSafe(user);
	}

	@Patch("update/image")
	async updateImage(
		@GetUser() user: User,
		@Body() body
	): Promise<{ image: string }> {
		return await this.userService.updateUserImage(user, body.imageType, body.base64Data);
	}

	@Patch("update/name")
	async updateName(
		@GetUser() user: User,
		@Body() body
	): Promise<{ name: string }> {
		return this.userService.updateUserName(user, body.name);
	}

	@Get("find")
	async findUser(@Query("username") username: string): Promise<UserSafeDTO> {
		return this.userService.findUser(username);
	}
}
