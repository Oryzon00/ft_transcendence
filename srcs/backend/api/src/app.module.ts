import { Module } from "@nestjs/common";
import { AppController, AppController2 } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";

@Module({
	imports: [],
	controllers: [AppController, AppController2],
	providers: [AppService, PrismaService]
})
export class AppModule {}

// Controller --> Verificateur (if)
// Service --> action

// front va appeler un des differents controllers
