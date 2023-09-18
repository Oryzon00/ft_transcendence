import { useContext, useEffect, useState } from "react";
import { WebsocketContext, WebsocketProvider, socket } from "../../utils/contexts/WebsocketContext";
import { ChannelPayload, ListChannel, MessagePayload } from "./chat.d";
import { UserHook } from "../../utils/hooks/TuseUser";
import useUser from "../../utils/hooks/useUser";

// Components
import DiscussionBoard from "../../components/Chat/Discussion/DiscussionBoard";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { notifyError } from "../../utils/notify";

import ChatNav from "../../components/Chat/ChatNav";
import OverlayPopup from "../../components/Chat/OverlayPopup";
// Images

function ChatLayout() {
	const [current, setCurrent] = useState("");
	const [channel, setChannel] = useState<ListChannel>({});
	const [refresh, setRefresh] = useState(false);

	const [creation, setCreation] = useState(false);
	const [community, setCommunity] = useState(false);
	const [direct, setDirect] = useState(false);

	const sockets = useContext(WebsocketContext);
	const user: UserHook = useUser();

	const getChatData = () => {
		// Get all the data for the variable channel
		fetch(apiAddress + "/chat/getData", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie()
			}
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (data): void {
				setChannel(data);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	const addMessage = (message: MessagePayload) => {
		setChannel((prev) => {
			prev[message.channelId].message.push(message);
			return prev;
		});
	};

	useEffect(() => {
		getChatData();

		// Create new channel
		sockets.on("onChannel", (data: any) => {
			setCurrent(() => {
				return data.id;
			});

			if (channel[data.id] == undefined) {
				setChannel((prev) => {
					prev[data.id] = data;
					return prev;
				});
			}
		});

		sockets.on("onMessage", (data: MessagePayload) => {
			addMessage(data);
			setRefresh(!refresh)
		});

		// Preparation for invitation in a room.
		sockets.on("onInvitation", (data: any) => {
			console.log(data);
		});

		return () => {
			console.log("Unregistered events...");
			sockets.off("onMessage");
			sockets.off("onChannel");
			sockets.off("onInvitation");
		};
	}, [refresh]);

	return (
		<WebsocketProvider value={socket}>
			<div className="h-[calc(100%-5rem)] w-auto flex flex-grow justify-center">
			<OverlayPopup
				creation={creation}
				togglecreation={() => setCreation(!creation)}
				community={community}
				togglecommunity={() => setCommunity(!community)}
				channel={channel}
				setChannel={(e: ChannelPayload) =>
					setChannel({ ...channel, [e.id]: e })
				}
			/>
			<ChatNav
				creation={creation}
				community={community}
				channel={channel}
				current={current}
				setDirect={setDirect}
				setCreation={setCreation}
				setChannel={setChannel}
				setCurrent={setCurrent}
				setCommunity={setCommunity}
			/>
			<DiscussionBoard
				channel={channel}
				setChannel={(e: ListChannel) => setChannel(e)}
				current={current}
				setCurrent={setCurrent}
				me={user}
				sockets={sockets}
			/>
			</div>
	</WebsocketProvider>
	);
}

export default ChatLayout;
