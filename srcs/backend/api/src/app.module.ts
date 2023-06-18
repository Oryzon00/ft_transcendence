import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [ChatModule, AuthModule, UserModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
