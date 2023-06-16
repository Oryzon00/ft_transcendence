import { Chat } from "./chat/chat";
import { socket, WebsocketProvider } from "./contexts/WebsocketContext";

function App() {
	return (
		<WebsocketProvider value={socket}>
			<Chat/>	
		</WebsocketProvider>
	);
}

export default App;
