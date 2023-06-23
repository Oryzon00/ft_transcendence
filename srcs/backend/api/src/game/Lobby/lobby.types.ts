export class LobbyCreateDto
{
  mode: LobbyMode
}

export type LobbyMode = 'PvE' | 'PvP';