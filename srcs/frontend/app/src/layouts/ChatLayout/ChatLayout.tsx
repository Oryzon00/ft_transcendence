import { useContext, useEffect, useState } from "react";
import { socket, WebsocketContext, WebsocketProvider } from "../../contexts/WebsocketContext";
import { MessagePayload, ChannelPayload } from "./chat.d"
import { UserHook } from "../../utils/hooks/TuseUser";
import useUser from "../../utils/hooks/useUser";
import "./chat.css";

// Components
import MessageEntry from "../../components/Chat/MessageEntry";
import DiscussionBoard from "../../components/Chat/DiscussionBoard";
import apiAddress from "../../utils/apiAddress";

function ChatLayout() {
	const [current, setCurrent] = useState(0);
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [channel, setChannel] = useState<{[key: number]: ChannelPayload}>({});
	const sockets = useContext(WebsocketContext);
	const user : UserHook = useUser();
	
	useEffect(() => {
		sockets.on('connect', () => {
			fetch( apiAddress + "/chat/getData",{
				method: "GET",
				headers: {
				}
			}

			)
			console.log("Connected!");
		});

		// Received new message
		sockets.on('onMessage', (data: MessagePayload) => {
				// Add the new received messages in the right channel
				setChannel((prev) => { 
					prev[data.channelId].messagesId.push(data);
					return prev;
				});
		});

		// Create new channel
		sockets.on('onChannel', (data: any) => {
			setCurrent(() => { return data.id });
			console.log(data.id);
			console.log(channel[data.id])
			if (channel[data.id] == undefined)
			{
				setChannel((prev) => {
					prev[data.id] = data;
					return prev;
				});
			}
		});

		return () => {
			console.log('Unregistered events...');
			sockets.off('connect');
			sockets.off('onMessage');
			sockets.off('onChannel');
		};
	}, [channel]);

	const createChannel = () => {
		socket.emit('newChannel', {ownerId: user.user.id , name: room})
		setName(room);
		setRoom('');
	};

	const inviteFriend = () => {};
	const modifyMessage = () => {};
	const modifyChannel = () => {};

	return ( 
		<section id="chat">
			<div id="info">
				<div id="channel">
					<button>search channel</button>
					<button>create channel</button>
				</div>
				<div id="conversation">
					<input type="text" />


				</div>
			</div>
			<div id="send">
				<div id="main-channel-name">
					<p>{name}</p>
				</div>
				<DiscussionBoard channel={channel} current={current} me={user}/>
				<WebsocketProvider value={socket}>
					<MessageEntry socket={socket} current={current}/>
				</WebsocketProvider>
			</div>
		</section>
	);
}

export default ChatLayout;