import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

	@UseGuards(AuthGuard("jwt"))
	@Get("me")
	getMe(){
		console.log("in /user/me");
		// comment recuperer user dans request ?
		const userInfo = {
			private: "privateUserInfo"
		}
		return userInfo
	}
}
