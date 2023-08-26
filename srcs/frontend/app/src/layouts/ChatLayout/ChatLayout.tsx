import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../utils/contexts/WebsocketContext";
import { ChannelPayload, ListChannel, MessagePayload } from "./chat.d";
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
import ChatNav from "../../components/Chat/ChatNav";
// Images

function ChatLayout() {
	const [current, setCurrent] = useState("");
	const [channel, setChannel] = useState<ListChannel>({});

	const [creation, setCreation] = useState(false);
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

	useEffect(() => {
		getChatData();

		sockets.on("connect", () => {
			sockets.emit("authenticate", user.user);
		});

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
			console.log(data);
			// Temp solution
			getChatData();
		});

		return () => {
			console.log("Unregistered events...");
			sockets.off("connect");
			sockets.off("onMessage");
			sockets.off("onChannel");
		};
	}, []);

	return (
		<section className="h-[90%] w-auto flex flex-grow justify-center">
			<ChatNav
				creation={creation}
				channel={channel}
				setDirect={setDirect}
				setCreation={setCreation}
				setChannel={setChannel}
				setCurrent={setCurrent}
			/>
			<DiscussionBoard
				channel={channel}
				setChannel={(e: ListChannel) => setChannel(e)}
				current={current}
				setCurrent={setCurrent}
				me={user}
				sockets={sockets}
			/>
		</section>
	);
}

export default ChatLayout;
