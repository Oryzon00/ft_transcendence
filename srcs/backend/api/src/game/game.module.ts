import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { LobbyManager } from './Lobby/LobbyManager';

@Module({
	providers: [GameGateway, LobbyManager],
})
export class GameModule {}