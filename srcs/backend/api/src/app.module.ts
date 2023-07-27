import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
<<<<<<< HEAD
import { ChatModule } from "./chat/chat.module";

@Module({
	imports: [AuthModule, UserModule, PrismaModule, ChatModule],
=======
import { GameModule } from './game/game.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [AuthModule, UserModule, PrismaModule, ServeStaticModule.forRoot({
		rootPath: join(__dirname, '..', 'images'),
		serveRoot: '/images',
	}), GameModule,],
>>>>>>> origin/main
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
