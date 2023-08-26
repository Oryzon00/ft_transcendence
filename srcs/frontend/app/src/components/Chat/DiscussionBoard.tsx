import { useEffect, useState } from "react";
import { ChannelPayload } from "../../layouts/ChatLayout/chat.d";
import { UserHook } from "../../utils/hooks/TuseUser";
import ChooseBox from "./Discussion/ChooseBox";
import getJwtTokenFromCookie from "../../utils/getJWT";
import apiAddress from "../../utils/apiAddress";
import { Socket } from "socket.io-client";
import MessageEntry from "./MessageEntry";
import Dots from "../../assets/chat/not-clicked/dots.png";
import Bubble from "../../assets/chat/bubble-chat.png";

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
		"flex-grow w-[100%] h-auto col bg-[#282b30]  max-w-[1120px]";

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
			<div className={base_css}>
				<div className="flex text-center justify-center items-center flex-col h-full">
					<img src={Bubble} alt="" />
					<h2 className="text-3xl">ft_transcendance chat</h2>
					<p className="text-sl flex items-center justify-center">
						Create or join a channel
					</p>
				</div>
			</div>
		);
	return (
		<div className={base_css}>
			<div
				id="header-discussion-bar"
				className="flex flex-row justify-between bg-black text-4xl text-white"
			>
				<div className="flex flex-col">
					<h2 className="text-[1.6em]">{channel[current].name}</h2>
					<p className="text-[0.6em]">
						{channel[current].description != undefined
							? channel[current].description
							: "Send a message"}
					</p>
				</div>
				<div>
					<button>
						<img src="" alt="" />
					</button>
					<button>
						<img src={Dots} alt="" />
					</button>
				</div>
			</div>
			<ChooseBox
				value={value}
				setValue={setValue}
				channel={channel}
				current={current}
				me={me}
			/>
			<div className="flex-none w-full">
				<MessageEntry current={current} sockets={sockets} />
			</div>
		</div>
	);
}

export default DiscussionBoard;
function getChatData(): any {
	throw new Error("Function not implemented.");
}
