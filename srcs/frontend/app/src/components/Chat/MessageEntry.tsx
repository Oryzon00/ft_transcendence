import { useState } from "react";
import { Socket } from "socket.io-client";

function MessageEntry (socket: Socket, current: number) {
	const [value, setValue] = useState('');

	const sendMessage = () => {
		let sendMessages = {channelId: current, content: value};
		socket.emit('newMessage', sendMessages);
		setValue('');
	};

    return (
				<div id="message">
					<input type="text" value={value} placeholder="Taper un message" onChange={(e) => setValue(e.target.value)} maxLength={2000} />
					<button onClick={sendMessage}>
						Send
					</button>
				</div>
    );
}

export default MessageEntry;