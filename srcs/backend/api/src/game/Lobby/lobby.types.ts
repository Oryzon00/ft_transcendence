import { IsString } from "class-validator";

export class LobbyCreateDto
{
	@IsString()
	mode: LobbyMode
}

export class LobbyJoinDto
{
	@IsString()
	lobbyId: string
}

export type LobbyMode = 'PvE' | 'PvP' | 'Rumble' | 'Private';