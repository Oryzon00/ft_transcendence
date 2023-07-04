import { useContext, useEffect, useState } from "react";
import { socket, WebsocketContext, WebsocketProvider } from "../../contexts/WebsocketContext";
import "./chat.css";

type MessagePayload = {
	channel: string;
	author: string;
	content: string;
};


export function Chat() {
	const [value, setValue] = useState('');
	const [messages, setMessages] = useState<MessagePayload[]>([]);
	const sockets = useContext(WebsocketContext);

	useEffect(() => {
		sockets.on('connect', () => {
			console.log("Connected!");
		});
		sockets.on('onMessage', (data: MessagePayload) => {
			if (data.content != "") {
				console.log(data);
				setMessages((prev) => [...prev, data]);
			}
		});

		return () => {
			console.log('Unregistered events...');
			sockets.off('connect');
			sockets.off('onMessage');
		};
	}, []);

	const onSubmit = () => {
		let sendMessages = {author: 'me', channel: undefined, content: value}
		sockets.emit('newMessage', sendMessages);
		setValue('');
	};

	return ( 
		<section id="chat">
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
		</section>
	);
}