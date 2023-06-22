import { useContext, useEffect, useState } from "react";
import { socket, WebsocketContext, WebsocketProvider } from "../../contexts/WebsocketContext";
import "./chat.css"

type MessagePayload = {
	content: string;
	msg: string;
};

export function Chat() {
	const [value, setValue] = useState('');
	const [messages, setMessages] = useState<MessagePayload[]>([]);
	const socket = useContext(WebsocketContext);

	useEffect(() => {
		socket.on('connect', () => {
			console.log("Connected!");
		});
		socket.on('onMessage', (data: MessagePayload) => {
			if (data.content != "") {
				console.log(data);
				setMessages((prev) => [...prev, data]);
			}
		});

		return () => {
			console.log('Unregistered events...');
			socket.off('connect');
			socket.off('onMessage');
		};
	}, []);

	const onSubmit = () => {
		socket.emit('newMessage', value);
		setValue('');
	};

	return ( 
		<WebsocketProvider value={socket}>
			<div id="message-box">
				{
				messages.map((msg) => 
				<div>
					<p>{msg.content}</p>
				</div>
					)}
			</div>
			<div id="message-bar">
				<input type="text" value={value} placeholder="Envoyer un message dans le channel" onChange={(e) => setValue(e.target.value)}  />
				<button onClick={onSubmit}>Submit</button>
			</div>
		</WebsocketProvider>
	);
}
