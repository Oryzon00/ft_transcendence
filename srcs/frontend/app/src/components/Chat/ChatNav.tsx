import JoinChannelLayout from "./Discussion/JoinChannelLayout";
import { ChannelPayload, ListChannel } from "../../layouts/ChatLayout/chat.d";
import ChannelBoard from "./ChannelBoard/ChannelBoard";
import ChannelBoardButton from "./ChannelBoard/ChannelBoardButton";

type ChatNavType = {
	creation: Boolean;
	channel: ListChannel;
	setDirect: any;
	setCreation: any;
	setChannel: any;
	setCurrent: any;
};

function ChatNav({
	creation,
	channel,
	setDirect,
	setCreation,
	setChannel,
	setCurrent
}: ChatNavType) {
	return (
		<div className="flex-grow flex flex-col w-[20%] min-w-[18em] max-w-[18em] bg-[#1e2124] ">
			<ChannelBoardButton direct={setDirect} creation={setCreation} creationvalue={creation}	/>
			<ChannelBoard channels={channel} setCurrent={setCurrent} />
		</div>
	);
}

export default ChatNav;
