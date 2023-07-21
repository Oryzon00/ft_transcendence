import { useState } from "react";
import { socket, WebsocketProvider } from "../../contexts/WebsocketContext";

function MessageEntry (current: string) {
	const [value, setValue] = useState('');

	const sendMessage = () => {
		let sendMessages = {channelId: current, content: value};
		socket.emit('newMessage', sendMessages);
		setValue('');
	};

    return (
				<WebsocketProvider value={socket}>
					<div id="message">
						<input type="text" value={value} placeholder="Taper un message" onChange={(e) => setValue(e.target.value)} maxLength={2000} />
						<button onClick={sendMessage}>
							Send
						</button>
					</div>
				</WebsocketProvider>
    );
}

export default MessageEntry;