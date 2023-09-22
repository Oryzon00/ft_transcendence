import { ChannelPayload, ListChannel } from "../../layouts/ChatLayout/chat.d";
import Community from "./Community/Community";
import CreateChannel from "./CreateChannel/CreateChannel";

type OverlayPopupType = {
	creation: boolean;
	togglecreation: any;
	community: boolean;
	togglecommunity: any;
	channel: ListChannel;
	setChannel: any;
};

function OverlayPopup({
	creation,
	togglecreation,
	community,
	togglecommunity,
	channel,
	setChannel,
}: OverlayPopupType) {
	const overlay: string =
		"w-screen h-screen fixed top-0 left-0 bg-opacity-30 bg-[#313131cc] flex justify-center items-center";

	if (creation)
		return (
			<div className="flex justify-center items-center absolute w-full h-[90%]">
				<div className={overlay} onClick={togglecreation} />
				<div className="absolute">
					<CreateChannel togglemodal={togglecreation} setChannel={setChannel} />
				</div>
			</div>
		);
	if (community)
		return (
			<div className="flex justify-center items-center absolute w-full h-[90%]">
				<div className={overlay} onClick={togglecommunity} />
				<div className="absolute">
					<Community togglemodal={togglecommunity} channel={channel} setChannel={setChannel}/>
				</div>
			</div>
		);
	return null;
}

export default OverlayPopup;