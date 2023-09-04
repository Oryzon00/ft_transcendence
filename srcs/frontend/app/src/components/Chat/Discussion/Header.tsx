
// Images
import Dots from "../../../assets/chat/not-clicked/dots.png";
import Add from "../../../assets/chat/not-clicked/add-user.png"
import Modo from "../../../assets/chat/not-clicked/modo.png";
import Quit from "../../../assets/chat/not-clicked/quit.png";

import { ChannelPayload } from "../../../layouts/ChatLayout/chat.d";

type HeaderType = {
    channel: { [key: string]: ChannelPayload };
    current: string;
};

function Header({channel, current} : HeaderType) {
    return (
			<div
				id="header-discussion-bar"
				className="flex flex-row justify-between items-center bg-[#282b30] text-white border-b-[#1e2124] border-b-2 border-0 h-13"
			>
					<h2 className="ml-2">{channel[current].name}</h2>
                    {channel[current].description != "" ? <p>{channel[current].description}</p> : null}
				<div className="flex flex-row items-center">
                    <button className="bg-[#282b30]">
                        <img src={Modo} />
                    </button>
					<button className="bg-[#282b30] h-full">
						<img src={Add} alt="" />
					</button>
					<button  className="bg-[#282b30]">
						<img src={Quit} />
					</button>
				</div>
			</div>
    );
}

export default Header;