import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "../dto/jwtPayload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(private readonly prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false, //change to true?
			secretOrKey: process.env.JWT_SECRET
		});
	}

	async validate(payload: JwtPayload) : Promise<JwtPayload> {
		console.log(payload); //to delete
		const user = await this.prisma.user.findUnique({
			where: {
				id: Number(payload.sub)
			}
		})
		if (!user)
			throw new UnauthorizedException();
		return payload;
	}
}
