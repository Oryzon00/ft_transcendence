import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {

	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	password: string
}
