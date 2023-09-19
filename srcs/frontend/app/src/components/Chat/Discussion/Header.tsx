// Images
import Add from "../../../assets/chat/not-clicked/add-user.png";
import Modo from "../../../assets/chat/not-clicked/modo.png";
import Quit from "../../../assets/chat/not-clicked/quit.png";

import ModoClicked from "../../../assets/chat/clicked/modo.png";

import { ChannelPayload } from "../../../layouts/ChatLayout/chat.d";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";
import { useEffect } from "react";

type HeaderType = {
	channel: { [key: string]: ChannelPayload };
	setChannel: any;
	current: string;
	setCurrent: any;
	modo: any;
	modoValue: boolean;
};

type quitType = {
	id: string;
};

const fetchQuit = (channel: quitType) => {
	fetch(apiAddress + "/chat/channel/quit", {
		method: "PATCH",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie(),
			"Content-Type": "application/json"
		},
		body: JSON.stringify(channel)
	})
		.then(function (res: Response) {
			if (!res.ok) {
				throw new Error("Request failed with status " + res.status);
			}
			return res.json();
		})
		.catch(function (error) {
			notifyError(error.message);
		});
};

function Header({
	channel,
	setChannel,
	current,
	setCurrent,
	modo,
	modoValue
}: HeaderType) {
	const quitChannel = (id: string) => {
		console.log(id);
		const copy = { ...channel };
		const quit: quitType = { id: id };
		delete copy[current];
		setChannel(copy);
		fetchQuit(quit);
		setCurrent("");
	};

	useEffect(() => {
		modo(false);
	}, [current]);
	return (
		<div
			id="header-discussion-bar"
			className="flex flex-row justify-between items-center bg-[#282b30] text-white border-b-[#1e2124] border-b-2 border-0 h-16"
		>
			<h2 className="ml-2">{channel[current].name}</h2>
			{channel[current].description != "" ? (
				<p>{channel[current].description}</p>
			) : null}
			<div className="flex flex-row items-center">
				<button
					className="bg-[#282b30] h-full"
					onClick={() => modo(!modoValue)}
				>
					{modoValue ? <img src={ModoClicked} /> : <img src={Modo} />}
				</button>
				<button className="bg-[#282b30] h-full">
					<img src={Add} alt="" />
				</button>
				<button
					className="bg-[#282b30] h-full"
					onClick={() => quitChannel(current)}
				>
					<img src={Quit} />
				</button>
			</div>
		</div>
	);
}

export default Header;
