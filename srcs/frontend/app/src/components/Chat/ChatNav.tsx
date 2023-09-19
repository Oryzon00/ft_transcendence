import { ChannelPayload, ListChannel } from "../../layouts/ChatLayout/chat.d";
import ChannelBoard from "./ChannelBoard/ChannelBoard";
import ChannelBoardButton from "./ChannelBoard/ChannelBoardButton";

type ChatNavType = {
	creation: boolean;
	channel: ListChannel;
	community: boolean;
	current: string;
	direct: boolean;
	directChannel: ListChannel;

	setDirect: any;
	setCommunity: any;
	setCreation: any;
	setChannel: any;
	setCurrent: any;
};

function ChatNav({
	creation,
	channel,
	community,
	current,
	direct,
	setDirect,
	directChannel,
	setCreation,
	setCommunity,
	setCurrent
}: ChatNavType) {
	return (
		<div className="flex-grow flex flex-col h-full w-[20%] min-w-[18em] max-w-[18em] bg-[#1e2124]">
			<ChannelBoardButton
				direct={setDirect}
				directvalue={direct}
				creation={setCreation}
				creationvalue={creation}
				community={setCommunity}
				communityvalue={community}
			/>
			<ChannelBoard
				channels={direct ? directChannel : channel}
				setCurrent={setCurrent}
				current={current}
			/>
		</div>
	);
}

export default ChatNav;
