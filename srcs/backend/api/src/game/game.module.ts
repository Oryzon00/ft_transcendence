import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { LobbyManager } from './Lobby/LobbyManager';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [ScheduleModule.forRoot()],
	providers: [GameGateway, LobbyManager],
})
export class GameModule {}