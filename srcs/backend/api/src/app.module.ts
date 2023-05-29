import { Module } from "@nestjs/common";
import { AppController, AppController2 } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [AuthModule, UserModule, PrismaModule],
	controllers: [AppController, AppController2],
	providers: [AppService]
})
export class AppModule {}
