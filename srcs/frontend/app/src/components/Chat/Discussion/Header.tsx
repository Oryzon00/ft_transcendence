// Images
import Add from "../../../assets/chat/not-clicked/add-user.png";
import Modo from "../../../assets/chat/not-clicked/modo.png";
import Quit from "../../../assets/chat/not-clicked/quit.png";

import ModoClicked from "../../../assets/chat/clicked/modo.png";

import { ChannelPayload } from "../../../layouts/ChatLayout/chat.d";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";
import { useEffect, useState } from "react";

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
	const [isModo, setModo] = useState<boolean>(false);
	const [avatar, setAvatar] = useState<string>("");
	const [name, setName] = useState<string>("");

	const quitChannel = (id: string) => {
		const copy = { ...channel };
		const quit: quitType = { id: id };
		delete copy[current];
		setChannel(copy);
		fetchQuit(quit);
		setCurrent("");
	};

	const other = () => {
		fetch(apiAddress + "/chat/channel/direct/other", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: channel[current].id })
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (e) {
				setName(e.name);
				setAvatar(e.image);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	useEffect(() => {
		modo(false);
		fetch(apiAddress + "/chat/channel/modo", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: current })
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (e) {
				setModo(e);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
		if (channel[current].direct) other();
	}, [current]);
	return (
		<div
			id="header-discussion-bar"
			className="flex flex-row justify-between items-center bg-[#282b30] text-white border-b-[#1e2124] border-b-2 border-0 h-16"
		>
			<div className="ml-2">
				{channel[current].direct ? (
					<div className="flex flex-row items-center">
						<img src={avatar} className="w-12 h-12 rounded-full" />
						<h2 className=" text-2xl">{name}</h2>
					</div>
				) : (
					<h2>{channel[current].name}</h2>
				)}
			</div>
			{channel[current].description != "" ? (
				<p>{channel[current].description}</p>
			) : null}
			<div className="flex flex-row items-center">
				{isModo ? (
					<button
						className="bg-[#282b30] h-full"
						onClick={() => modo(!modoValue)}
					>
						{modoValue ? (
							<img src={ModoClicked} />
						) : (
							<img src={Modo} />
						)}
					</button>
				) : null}
				{channel[current].direct ? (
					<button className="bg-[#282b30]">
						<svg
							stroke="currentColor"
							fill="none"
							strokeWidth="2"
							viewBox="0 0 24 24"
							strokeLinecap="round"
							strokeLinejoin="round"
							height={32}
							width={32}
							xmlns="http://www.w3.org/2000/svg"
							className="bg-[#282b30]"
						>
							<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline>
							<line x1="13" x2="19" y1="19" y2="13"></line>
							<line x1="16" x2="20" y1="16" y2="20"></line>
							<line x1="19" x2="21" y1="21" y2="19"></line>
							<polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
							<line x1="5" x2="9" y1="14" y2="18"></line>
							<line x1="7" x2="4" y1="17" y2="20"></line>
							<line x1="3" x2="5" y1="19" y2="21"></line>
						</svg>
					</button>
				) : null}
				<button
					className="bg-[#282b30] h-full"
					onClick={() => quitChannel(current)}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						stroke="#"
						className="bg-[#282b30]"
						height={40}
						width={40}
					>
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path
								d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"
								fill="#ffffff"
							></path>{" "}
						</g>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default Header;
