import { useContext, useEffect, useState } from "react";
import { socket, WebsocketContext, WebsocketProvider } from "../../contexts/WebsocketContext";
import "./chat.css"
import { ChannelBar } from "./ChannelBar";

type MessagePayload = {
	channel: string;
	user: string;
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
		sockets.emit('newMessage', value);
		setValue('');
	};

	return ( 
		<section id="chat">
			<ChannelBar/>
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