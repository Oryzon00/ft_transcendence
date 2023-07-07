import { useContext, useEffect, useState } from "react";
import { socket, WebsocketContext, WebsocketProvider } from "../../contexts/WebsocketContext";
import send from '../../assets/send.png'
import chat from '../../assets/channel.png'
import search from '../../assets/search.png'
import { MessagePayload, ChannelPayload } from "./chat.d"
import "./chat.css";

export function Chat() {
	const [value, setValue] = useState('');
	const [channel, setChannel] = useState<ChannelPayload[]>([]);
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

		sockets.on('newChannel', (data: MessagePayload) => {
			//setChannel(());
		});

		return () => {
			console.log('Unregistered events...');
			sockets.off('connect');
			sockets.off('onMessage');
		};
	}, []);

	const sendMessage = () => {
		let sendMessages = {author: 'me', channel: undefined, content: value};
		sockets.emit('newMessage', sendMessages) ;
		setValue('');
	};

	const createChannel = () => {
		let sendChannel = {userId: 1};
		socket.emit('newChannel', 'newChannel')
	};

	const modifyMessage = () => {};
	const modifyChannel = () => {};

	return ( 
		<section id="chat">
			<WebsocketProvider value={socket}>
				<div id="chat-parameters">
					<button id="create-channel" onClick={createChannel}>
						<img src={chat}/>
					</button>
				</div>
				<div id="search-block">
					<span>
						<img src={search} alt="" />
						<input type="text" />
					</span>
				</div>

				<div id="discussion">
					<div id="message-box">
						{
						messages.map((msg) => 
						<div>
							<p>{msg.content}</p>
						</div>
							)}
					</div>
					<div id="message-bar">
						<input type="text" value={value} placeholder="Taper un message" onChange={(e) => setValue(e.target.value)}  />
						<button onClick={sendMessage}>
							<img src={send}/>
						</button>
					</div>
				</div>
			</WebsocketProvider>
		</section>
	);
}