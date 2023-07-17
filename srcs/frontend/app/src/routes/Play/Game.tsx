import SocketWrapper, { SocketWrapperContext, SocketWrapperProvider } from './SocketWrapper';
import { useContext, useEffect, useState } from 'react';
import { ClientEvents, Listener, ServerEvents } from './types'
import { ServerPayload } from './ServerPayload'

export default function Game() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);
	const [inLobby, setInLobby] = useState(Boolean(false));
  
	function onPing() {
		sm.emit({
			event: ClientEvents.Ping,
			data: 'test'
		});
	};
  
	function onNewGame(mode: 'PvE' | 'PvP') {
		sm.emit({
		  	event: ClientEvents.LobbyCreate,
		  	data: {
				mode: mode,
			},
		});
	};

	useEffect(() => {
		const onPong: Listener<ServerPayload[ServerEvents.Pong]> = async (data) => {
			console.log(data.message);

		}



		const onGameMessage: Listener<ServerPayload[ServerEvents.GameMessage]> = ({ message}) => {
			if (message === "Game is Starting")
				setInLobby(true);
			console.log(message);
		};

		 const onLobbyState: Listener<ServerPayload[ServerEvents.LobbyState]> = (data) => {
			console.log(data);
		};

		console.log("adding listeners");
		sm.addListener(ServerEvents.Pong, onPong);
		sm.addListener(ServerEvents.LobbyState, onLobbyState);
		sm.addListener(ServerEvents.GameMessage, onGameMessage);

		return () => {
			console.log('removing listeners');
			sm.removeListener(ServerEvents.Pong, onPong);
			sm.removeListener(ServerEvents.GameMessage, onGameMessage);
			sm.removeListener(ServerEvents.LobbyState, onLobbyState);

		};
	}, []);

	
	if (!inLobby) {
		return (
		  <div>
			<SocketWrapperProvider value={sm}>
				<button onClick={() => onNewGame('PvE')}>Play VS Bot</button>
				<button onClick={() => onNewGame('PvP')}>Play 1v1</button>
				<button onClick={onPing}>ping</button>
			</SocketWrapperProvider>
		  </div>
		);
	}
	return (<div>
		<SocketWrapperProvider value={sm}>
			<span>in game</span>
		</SocketWrapperProvider>
	</div>);
  }