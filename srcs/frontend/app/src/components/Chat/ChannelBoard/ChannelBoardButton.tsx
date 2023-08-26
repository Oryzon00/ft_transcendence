// Images

import People from "../../../assets/chat/not-clicked/private-message.png";
import Discussion from "../../../assets/chat/not-clicked/channel.png";
import JoinChannel from "../../../assets/chat/not-clicked/search-channel.png";
import Dots from "../../../assets/chat/not-clicked/dots.png";

type BoardButtonType = {
	direct: any;
	creation: any;
};

function ChannelBoardButton({ direct, creation }: BoardButtonType) {
	const not_clicked =
		"w-full bg-[#242424] hover:bg-amber-800 px-5 py-2 rounded-md flex justify-center";
	const clicked = "";

	return (
		<div className="flex">
			<button onClick={() => direct(true)} className={not_clicked}>
				<img src={People} />
			</button>
			<button onClick={() => creation(true)} className={not_clicked}>
				<img src={Discussion} />
			</button>
			<button className={not_clicked}>
				<img src={JoinChannel} />
			</button>
			<button className={not_clicked}>
				<img src={Dots} />
			</button>
		</div>
	);
}

export default ChannelBoardButton;
