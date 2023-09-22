// Images

// Not clicked
import People from "../../../assets/chat/not-clicked/private-message.png";
import Discussion from "../../../assets/chat/not-clicked/channel.png";
import JoinChannel from "../../../assets/chat/not-clicked/search-channel.png";
import Dots from "../../../assets/chat/not-clicked/dots.png";
import CreatePrivate from '../../../assets/chat/not-clicked/create-private.png'

// Clicked
import PeopleClick from "../../../assets/chat/clicked/private-message.png";
import DiscussionClick from "../../../assets/chat/clicked/channel.png";
import JoinChannelClick from "../../../assets/chat/clicked/compass-circular-tool(1).png";
import CreatePrivateClick from '../../../assets/chat/clicked/create-private.png'

import ButtonNav from "./ButtonNav";

type BoardButtonType = {
	directvalue: boolean;
	creationvalue: boolean;
	communityvalue: boolean;

	direct: any;
	creation: any;
	community: any;
};

function ChannelBoardButton({
	direct,
	directvalue,
	creation,
	creationvalue,
	community,
	communityvalue
}: BoardButtonType) {
	return (
		<div className="flex w-full h-12">
			<ButtonNav
				action={direct}
				actionValue={directvalue}
				image_clicked={PeopleClick}
				image_not_clicked={People}
				title="direct"
			/>
			<ButtonNav
				action={creation}
				actionValue={creationvalue}
				image_clicked={(directvalue) ? CreatePrivateClick : DiscussionClick }
				image_not_clicked={(directvalue) ? CreatePrivate : Discussion}
				title="create"
			/>
			{
				(!directvalue) ?
			<ButtonNav
				action={community}
				actionValue={communityvalue}
				image_clicked={JoinChannelClick}
				image_not_clicked={JoinChannel}
				title="join"
			/> : null
			}
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
