import { io } from 'socket.io-client'
import SocketWrapper from './SocketWrapper';

export default function Game() {
	const {sm}: SocketWrapper = useSocketWrapper();
  
	const onPing = () => {
	  sm.emit({
		event: ClientEvents.Ping,
	  });
	};
  
	return (
	  <div>
		<button onClick={onPing}>ping</button>
	  </div>
	)
  }