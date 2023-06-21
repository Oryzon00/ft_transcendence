import { Patch, Controller, Get, UseGuards, Body } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { Jwt2FAGuard } from "src/auth/guard";
import { UserService } from "./user.service";

@UseGuards(Jwt2FAGuard)
@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}
	@Get("me")
	getMe(@GetUser() user: User) {
		return user;
	}

	
}
