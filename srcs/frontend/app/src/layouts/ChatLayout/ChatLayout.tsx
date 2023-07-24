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
import CreationChannelLayout from "../CreationChannelLayout/CreationChannelLayout";
import SearchChannelLayout from "../SearchChannelLayout/SearchChannelLayout";

function ChatLayout() {
	const [current, setCurrent] = useState('');
	const [channel, setChannel] = useState<ListChannel>({});

	const [creation, setCreation] = useState(false);
	const [search, setSearch] = useState(false);

	const sockets = useContext(WebsocketContext);
	const user : UserHook = useUser();
	console.log(user.user)

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
					console.log(data);
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
					<CreationChannelLayout socket={sockets} open={creation} onClose={() => setCreation(false)} newChannel={(e: ChannelPayload) => setChannel({...channel, [e.id]: e})}/>
					<SearchChannelLayout open={search} onClose={() => setSearch(false)} newChannel={(e: ChannelPayload) => setChannel({...channel, [e.id]: e})}/>
			<div className="bg-white w[30vw] flex flex-col">
				<div className="flex flex-col">
					<button onClick={() => setSearch(true)}>Search Channel</button>
					<button onClick={() => setCreation(true)}>Create Channel</button>
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