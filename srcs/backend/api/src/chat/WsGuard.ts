
import { CanActivate, Injectable, NotFoundException } from "@nestjs/common";
import * as process from "process";
import { Observable } from "rxjs/internal/Observable";
import {verify} from "jsonwebtoken"
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { JwtPayload } from "src/auth/dto/jwtPayload.dto";

@Injectable()
export class WsGuard implements CanActivate {
    constructor(
        private prisma: PrismaService
        ) {}

	async findUser(username: string): Promise<User> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					name: username
				}
			});
			return user;
		} catch {
			throw new NotFoundException();
		}
	}

    canActivate(
        context: any,
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const bearerToken : string = context.args[0].handshake.headers.authorization.split(' ')[1];
        try {
            const decoded : any = verify(bearerToken, process.env.JWT_SECRET);
            return new Promise((resolve, reject) => {
                return this.findUser(decoded.name).then((user) => {
                    context.args[0].userId = user.id;
                    if (user) { resolve(user); }
                    else { reject(false); }
                });

             });
        } catch (ex) {
            console.log("ERROR");
            return false;
        }
    }
}