// Images

import People from "../../../assets/chat/not-clicked/private-message.png";
import Discussion from "../../../assets/chat/not-clicked/channel.png";
import JoinChannel from "../../../assets/chat/not-clicked/search-channel.png";
import Dots from "../../../assets/chat/not-clicked/dots.png";

import DiscussionClick from "../../../assets/chat/clicked/channel.png";
import JoinChannelClick from "../../../assets/chat/clicked/compass-circular-tool(1).png";

import ButtonNav from "./ButtonNav";

type BoardButtonType = {
	direct: any;
	creation: any;
	creationvalue: boolean;
	community: any;
	communityvalue: boolean;
};

function ChannelBoardButton({
	direct,
	creation,
	creationvalue,
	community,
	communityvalue
}: BoardButtonType) {
	return (
		<div className="flex w-full h-12">
			<ButtonNav
				action={creation}
				actionValue={creationvalue}
				image_clicked={People}
				image_not_clicked={People}
				title={"private"}
			/>
			<ButtonNav
				action={creation}
				actionValue={creationvalue}
				image_clicked={DiscussionClick}
				image_not_clicked={Discussion}
				title="create"
			/>
			<ButtonNav
				action={community}
				actionValue={communityvalue}
				image_clicked={JoinChannelClick}
				image_not_clicked={JoinChannel}
				title="join"
			/>
			<ButtonNav
				action={creation}
				actionValue={creationvalue}
				image_clicked={Dots}
				image_not_clicked={Dots}
				title="more"
			/>
		</div>
	);
}

export default ChannelBoardButton;
