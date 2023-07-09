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
	const [name, setName] = useState('');
	const [value, setValue] = useState('');
	const [room, setRoom] = useState('');
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
			console.log(data);
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
		socket.emit('newChannel', {ownerId: 1, name: room})
		setName(room);
		setRoom('');
	};

	const inviteFriend = () => {};
	const modifyMessage = () => {};
	const modifyChannel = () => {};

	return ( 
		<section id="chat">
			<WebsocketProvider value={socket}>
				<div id="header">
					<p>{name}</p>
				</div>
				<div id="discussion">
					<Discussion channel={channel} current={current}/>
				</div>
				<div id="message">
					<p>Message</p>
					<input type="text" value={value} placeholder="Taper un message" onChange={(e) => setValue(e.target.value)} maxLength={2000} />
					<button onClick={sendMessage}>
						Send
					</button>
				</div>
				<div id="room">
					<p>Room</p>
					<input type="text" value={room} placeholder="Taper le nom de la room" onChange={(e) => setRoom(e.target.value)} maxLength={10}/>
					<button onClick={createChannel}>
						Room
					</button>
				</div>
			</WebsocketProvider>
		</section>
	);
}