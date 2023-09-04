import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

// Type
import { ChannelPayload } from "../../../layouts/ChatLayout/chat.d";

import { UserHook } from "../../../utils/hooks/TuseUser";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import apiAddress from "../../../utils/apiAddress";

// Dependencies
import MessageEntry from "../MessageEntry";
import Conversation from "./Conversation";

// Images
import Default from "./Default";
import Header from "./Header";

type CurrentChannel = {
	channel: { [key: string]: ChannelPayload };
	setChannel: any;
	current: string;
	setCurrent: any;
	me: UserHook;
	sockets: Socket;
};

function DiscussionBoard({
	channel,
	setChannel,
	current,
	setCurrent,
	me,
	sockets
}: CurrentChannel) {
	const base_css: string =
		"w-full h-full bg-[#282b30]";

	const [value, setValue] = useState(0);

	const leaveChannel = () => {
		fetch(apiAddress + "/chat/channel/quit", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: current
			})
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
			})
			.then(function () {
				setChannel(getChatData());
				console.log(channel);
				setCurrent("");
			});
	};

	if (current == "")
		return (
			<Default css={base_css}/>
		);

	return (
		<div className={base_css}>
			<Header channel={channel} current={current}/>
			<Conversation message={channel[current].message} me={me}/>
			<div className="w-full h-[7vh]"></div>
			<MessageEntry current={current} sockets={sockets} />
		</div>
	);
}

export default DiscussionBoard;
function getChatData(): any {
	throw new Error("Function not implemented.");
}
