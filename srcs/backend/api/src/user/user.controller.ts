import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

	@UseGuards(AuthGuard("jwt"))
	@Get("me")
	getMe(@Req() req: Request){
		console.log(req.user); //to test
		// comment recuperer user dans request ?
		return "Private user info";
	}
}
