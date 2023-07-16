
import { useContext, useEffect, useState } from "react";
import { socket, WebsocketContext, WebsocketProvider } from "../../contexts/WebsocketContext";
import { MessagePayload, ChannelPayload } from "./chat.d"
import "./chat.css";
import { UserHook } from "../../utils/hooks/TuseUser";
import useUser from "../../utils/hooks/useUser";

type CurrentChannel = {
	channel: {[key: number]: ChannelPayload},
	current: number,
    me: UserHook
}

function Discussion({channel, current, me} : CurrentChannel)
{
	if (current == 0)
		return (<div className="no-channel"><p>No channel</p></div>);
	console.log(channel);
	return ( 
		<div id="message-box">
		{
			channel[current].messagesId.map((msg : MessagePayload) => { 
                if (me.user.id == msg.authorId)
                    return ( <div><p className="me">{msg.authorId} {msg.content}</p></div>)
                else
                    return ( <div><p className="other">{msg.authorId} {msg.content}</p></div>)
            }
			)
		}
		</div>
	);
}

function ChatLayout() {
	const [current, setCurrent] = useState(0);
	const [name, setName] = useState('');
	const [value, setValue] = useState('');
	const [room, setRoom] = useState('');
	const [channel, setChannel] = useState<{[key: number]: ChannelPayload}>({});
	const sockets = useContext(WebsocketContext);
	const user : UserHook = useUser();
	
	useEffect(() => {
		sockets.on('connect', () => {
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

	const sendMessage = () => {
		let sendMessages = {authorId: user.user.id, channelId: current, content: value};
		sockets.emit('newMessage', sendMessages) ;
		setValue('');
	};

	const createChannel = () => {
		socket.emit('newChannel', {ownerId: user.user.id , name: room})
		setName(room);
		setRoom('');
	};

	const inviteFriend = () => {};
	const modifyMessage = () => {};
	const modifyChannel = () => {};

    const enter = (e : any) => {
        if (e == "Enter")
            sendMessage();
    }
	return ( 
		<section id="chat">
				<div id="header">
					<p>{name}</p>
				</div>
				<div id="discussion">
					<Discussion channel={channel} current={current} me={user}/>
				</div>
			<WebsocketProvider value={socket}>
				<div id="message">
					<p>Message</p>
					<input type="text" value={value} placeholder="Taper un message" onChange={(e) => setValue(e.target.value)} maxLength={2000} />
					<button onClick={() => {sendMessage(); setName(name)}}>
						Send
					</button>
				</div>
				<div id="room">
					<p>Room</p>
					<input type="text" value={room} placeholder="Taper le nom de la room" onChange={(e) => setRoom(e.target.value)} maxLength={10} />
					<button onClick={() => {createChannel(); setRoom(room)}}>
						Room
					</button>
				</div>
			</WebsocketProvider>
		</section>
	);
}

export default ChatLayout;