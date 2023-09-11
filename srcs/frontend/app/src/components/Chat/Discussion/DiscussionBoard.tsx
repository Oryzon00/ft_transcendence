import { useState } from "react";
import { Socket } from "socket.io-client";

// Type
import { ChannelPayload } from "../../../layouts/ChatLayout/chat.d";

import { UserHook } from "../../../utils/hooks/TuseUser";

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
	const [modo, setModo] = useState(false);

	if (current == "")
		return (
			<Default css={base_css}/>
		);

	return (
		<div className={base_css}>
			<Header channel={channel} current={current} setChannel={setChannel} setCurrent={setCurrent} modoValue={modo} modo={() => setModo(!modo)}/>
			{ (modo) ? <></> : 
				<>
					<Conversation message={channel[current].message} me={me}/>
					<MessageEntry current={current} sockets={sockets} />
				</>
			}
		</div>
	);
}

export default DiscussionBoard;