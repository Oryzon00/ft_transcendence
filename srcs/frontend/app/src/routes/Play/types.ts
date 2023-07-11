export type Listener<T> = (data: T) => void;

export enum ClientEvents
{
  // General
  Ping = 'client.ping',

  // Lobby
  LobbyCreate = 'client.lobby.create',
  LobbyJoin = 'client.lobby.join',
  LobbyLeave = 'client.lobby.leave'

}

export enum ServerEvents
{
  // General
  Pong = 'server.pong',

  // Lobby
  LobbyState = 'server.lobby.state',

  // Game
  GameMessage = 'server.game.message',
}