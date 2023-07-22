import { useState } from "react";
import { socket, WebsocketProvider } from "../../contexts/WebsocketContext";

function MessageEntry (current: string) {
	const [value, setValue] = useState('');

	const sendMessage = () => {
		if (current != '')
		{
			let sendMessages = {channelId: current, content: value};
			socket.emit('newMessage', sendMessages);
			setValue('');
		}
	};

    return (
		<WebsocketProvider value={socket}>
			<div className="flex flex-row space-x-1 flex-none w-full justify-center">
				<input type="text" value={value} className="rounded-[30px] w-[80%]" placeholder="Taper un message" onChange={(e) => setValue(e.target.value)} maxLength={2000} />
				<button onClick={sendMessage}>
					Send
				</button>
			</div>
		</WebsocketProvider>
    );
}

export default MessageEntry;