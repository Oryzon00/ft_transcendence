import { useContext, useEffect, useState } from "react";
import { socket, WebsocketContext, WebsocketProvider } from "../../contexts/WebsocketContext";
import { MessagePayload, ChannelPayload } from "./chat.d"
import { UserHook } from "../../utils/hooks/TuseUser";
import useUser from "../../utils/hooks/useUser";
//import "./chat.css";

// Components
import MessageEntry from "../../components/Chat/MessageEntry";
import DiscussionBoard from "../../components/Chat/DiscussionBoard";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { notifyError } from "../../utils/notify";
import { ButtonChannelSearch } from "../../components/Chat/ChannelSearch";
import { ButtonChannelCreation } from "../../components/Chat/ChannelCreation";

function ChatLayout() {
	const [current, setCurrent] = useState(0);
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [channel, setChannel] = useState<{[key: number]: ChannelPayload}>({});
	const sockets = useContext(WebsocketContext);
	const user : UserHook = useUser();

	const getChatData = () => { // Get all the data for the variable channel
		const url = apiAddress + '/chat/getData';
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie()
			}
		})
		.then(
			function (res) {
				if (!res.ok) {
					throw new Error(
						"Request failed with status " + res.status
					);
				}
				return (res.json);

			})
			.then (
				function (data) {
					console.log(data.Channel)
					setChannel(data)
				})
			.catch (
				function(error) {
					notifyError(error.message)
				}
			)
	};

	useEffect(() => {
		sockets.on('connect', () => {
				getChatData();
				console.log(channel);
				console.log("Connected!");
			})

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
		});
	//}, [channel]);

	/*
	//const inviteFriend = () => {};
	const modifyMessage = () => {};
	const modifyChannel = () => {};
	*/

	return ( 
		<section id="chat">
			<div id="info">
				<div id="channel">
					<ButtonChannelSearch/>
					<ButtonChannelCreation/>
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
				<MessageEntry current={current}/>
			</div>
		</section>
	);
}

export default ChatLayout;