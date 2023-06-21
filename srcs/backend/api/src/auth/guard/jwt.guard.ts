import { AuthGuard } from "@nestjs/passport";

export class Jwt2FAGuard extends AuthGuard("jwt-2fa") {
	constructor() {
		super();
	}
}
