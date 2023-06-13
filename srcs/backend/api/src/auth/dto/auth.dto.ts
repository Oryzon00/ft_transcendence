import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
	code: string;
	error: string;
}
