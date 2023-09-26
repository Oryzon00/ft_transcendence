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