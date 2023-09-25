export type Listener<T> = (data: T) => void;

export enum ClientEvents
{
  // General
  Ping = 'client.ping',

  // Lobby
  LobbyCreate = 'client.lobby.create',
  LobbyJoin = 'client.lobby.join',
  LobbyLeave = 'client.lobby.leave',

  MovePaddle = 'client.game.movePaddle'
}

export enum ServerEvents
{
  // General
  Pong = 'server.pong',

  QueueJoined = 'server.queue.joined',


  QueueLeft = 'server.queue.left',

  // Lobby
  LobbyState = 'server.lobby.state',

  // Game
  GameMessage = 'server.game.message',
}