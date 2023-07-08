import { useContext, useEffect, useState } from "react";
import { socket, WebsocketContext, WebsocketProvider } from "../../contexts/WebsocketContext";
import send from '../../assets/send.png'
import chat from '../../assets/channel.png'
import search from '../../assets/search.png'
import { MessagePayload, ChannelPayload } from "./chat.d"
import "./chat.css";

type CurrentChannel = {
	channel: {[key: number]: ChannelPayload},
	current: number
}
function Discussion({channel, current} : CurrentChannel)
{
	if (current <= 0)
		return (<p>No channel</p>);
	console.log(channel[current]);
	return ( 
		<div id="message-box">
		{
			channel[current].messagesId.map((msg : MessagePayload) => 
			<div>
				<p>{msg.content}</p>
			</div>
			)
		}
		</div>
	);
}

export function Chat() {
	const [current, setCurrent] = useState(0);
	const [value, setValue] = useState('');
	const [channel, setChannel] = useState<{[key: number]: ChannelPayload}>({});
	const sockets = useContext(WebsocketContext);
	
	useEffect(() => {
		sockets.on('connect', () => {
			console.log("Connected!");
		});

		// Received new message
		sockets.on('onMessage', (data: MessagePayload) => {
			if (data.content != "") {
				
				// Add the new received messages in the right channel
				setChannel((prev) => { 
					prev[data.channelId].message.push(data);
					return prev;
				});
			}
		});

		// Create new channel
		sockets.on('newChannel', (data: any) => {
			setCurrent(data.id);
			setChannel((prev) => {
				prev[data.id] = data;
				return prev;
			});
		});

		return () => {
			console.log('Unregistered events...');
			sockets.off('connect');
			sockets.off('onMessage');
		};
	}, []);

	const sendMessage = () => {
		let sendMessages = {authorId: 1, channelId: current, content: value};
		sockets.emit('newMessage', sendMessages) ;
		setValue('');
	};

	const createChannel = () => {
		socket.emit('newChannel', {userId: 1})
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
					<Discussion channel={channel} current={current}/>

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