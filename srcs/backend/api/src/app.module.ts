import { Module } from '@nestjs/common';
import { AppController, AppController2 } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GameGateway } from './game/game.gateway';

@Module({
  imports: [],
  controllers: [AppController, AppController2],
  providers: [AppService, PrismaService, GameGateway],
})
export class AppModule {}

// Controller --> Verificateur (if)
// Service --> action 

// front va appeler un des differents controllers
