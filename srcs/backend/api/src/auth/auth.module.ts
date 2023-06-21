import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { Jwt2FAStrategy } from "./strategy";

@Module({
	imports: [ConfigModule.forRoot(), HttpModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, Jwt2FAStrategy]
})
export class AuthModule {}
