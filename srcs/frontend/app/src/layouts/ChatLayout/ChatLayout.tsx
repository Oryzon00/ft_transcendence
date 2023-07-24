import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { ChannelPayload, ListChannel, MessagePayload } from "./chat.d"
import { UserHook } from "../../utils/hooks/TuseUser";
import useUser from "../../utils/hooks/useUser";

// Components
import MessageEntry from "../../components/Chat/MessageEntry";
import DiscussionBoard from "../../components/Chat/DiscussionBoard";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { notifyError } from "../../utils/notify";
import ChannelBoard from "../../components/Chat/ChannelBoard";
import CreationChannelLayout from "../JoinChannelLayout/JoinChannelLayout";
import JoinChannelLayout from "../JoinChannelLayout/JoinChannelLayout";
import BlockUser from "./BlockUser";


function ChatLayout() {
	const [current, setCurrent] = useState('');
	const [channel, setChannel] = useState<ListChannel>({});

	const [creation, setCreation] = useState(false);
	const [block, setBlock] = useState(false);

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
			function (res: Response) {
				if (!res.ok) {
					throw new Error(
						"Request failed with status " + res.status
					);
				}
				return (res.json());

			})
			.then (
				function (data) : void {
					setChannel(data)
				})
			.catch (
				function(error) {
					notifyError(error.message)
				}
			)
	};

	const isBlocked = (author : number) => {
		const url = apiAddress + '/chat/isBlocked';
		let blocked = false;
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				author: author
			})
		})
		.then(
			function (res: Response) {
				if (!res.ok) {
					throw new Error(
						"Request failed with status " + res.status
					);
				}
				return (res.json());
			}
		)
		.then(
			function (data) : void {
				blocked = data.res;
			}
		)
			.catch (
				function(error) {
					notifyError(error.message)
				}
			)
		return (blocked);
	}

	useEffect(() => {
		sockets.on('connect', () => {
			sockets.emit('authenticate', user.user);
			getChatData();
		})

		// Create new channel
		sockets.on('onChannel', (data: any) => {
			setCurrent(() => { return data.id });
			if (channel[data.id] == undefined)
			{
				setChannel((prev) => {
					prev[data.id] = data;
					return prev;
				});
			}
		});

		sockets.on('onMessage', (data: MessagePayload) => {
			if (!isBlocked(data.authorId))
				channel[data.channelId].message.push(data);
		})

		return () => {
			console.log('Unregistered events...');
			sockets.off('connect');
			sockets.off('onMessage');
			sockets.off('onChannel');
		};
		});

	return ( 
		<section className="h-screen w-screen bg-black flex">
					<JoinChannelLayout socket={sockets} open={creation} onClose={() => setCreation(false)} newChannel={(e: ChannelPayload) => setChannel({...channel, [e.id]: e})}/>
					<BlockUser show={block} hide={() => setBlock(false)}/>
			<div className="bg-white w[30vw] flex flex-col">
				<div className="flex flex-col">
					<button onClick={() => setCreation(true)}>Join Channel</button>
					<button onClick={() => setBlock(true)}>Block User</button>
				</div>
				<ChannelBoard channels={channel} setCurrent={setCurrent}/>
			</div>
			<div className="w-screen h-screen bg-blue-400 flex flex-col items-center justify-center" >
				<div className="flex-grow w-full h-full ">
					<div className="bg-white text-black w-[100%] h-[80%] border-black border-4">
						<DiscussionBoard channel={channel} current={current} me={user}/>
					</div>
				</div>
				<div className="flex-none w-full">
					<MessageEntry current={current} sockets={sockets}/>
				</div>
			</div>
		</section>
	);
}

export default ChatLayout;