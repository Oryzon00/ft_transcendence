import { IsNotEmpty, IsString, isString } from "class-validator";

export class AuthDto {
	// @IsString()
	"code": string;

	// @IsString()
	"error": string;
}
