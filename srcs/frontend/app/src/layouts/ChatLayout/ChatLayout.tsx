import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../utils/contexts/WebsocketContext";
import { ChannelPayload, ListChannel, MessagePayload } from "./chat.d"
import { UserHook } from "../../utils/hooks/TuseUser";
import useUser from "../../utils/hooks/useUser";

// Components
import MessageEntry from "../../components/Chat/MessageEntry";
import DiscussionBoard from "../../components/Chat/DiscussionBoard";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { notifyError } from "../../utils/notify";
import ChannelBoard from "../../components/Chat/ChannelBoard/ChannelBoard";
import JoinChannelLayout from "./JoinChannelLayout";

import ChannelBoardButton from "../../components/Chat/ChannelBoard/ChannelBoardButton";
// Images

export function getChatData() {}

function ChatLayout() {
	const [current, setCurrent] = useState('');
	const [channel, setChannel] = useState<ListChannel>({});

	const [creation, setCreation] = useState(false);
	const [direct, setDirect] = useState(false);

	const sockets = useContext(WebsocketContext);
	const user : UserHook = useUser();

	const getChatData = () => { // Get all the data for the variable channel
	fetch(apiAddress + '/chat/getData', {
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
				setChannel(data);
			})
		.catch (
			function(error) {
				notifyError(error.message);
			}
		)
	};

	useEffect(() => {
		getChatData();

		sockets.on('connect', () => {
			sockets.emit('authenticate', user.user);
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
			console.log(data)
			// Temp solution
			getChatData()
		})

		return () => {
			console.log('Unregistered events...');
			sockets.off('connect');
			sockets.off('onMessage');
			sockets.off('onChannel');
		};
		}, []);

	return ( 
		<section className="h-[90%] w-auto flex flex-grow">
			<JoinChannelLayout open={creation} onClose={() => setCreation(false)} newChannel={(e: ChannelPayload) => setChannel({...channel, [e.id]: e})}/>
			<div className="flex-grow flex flex-col w-[20%] min-w-[18em]">
				<ChannelBoardButton direct={setDirect} creation={setCreation}/>
				<ChannelBoard channels={channel} setCurrent={setCurrent}/>
			</div>
			<div className="flex-grow w-full h-auto col bg-[#282b30] border-black border-4" >
				<DiscussionBoard channel={channel} setChannel={(e: ListChannel) => setChannel(e)} current={current} setCurrent={setCurrent} me={user} sockets={sockets}/>
			</div>
		</section>
	);
}

export default ChatLayout;