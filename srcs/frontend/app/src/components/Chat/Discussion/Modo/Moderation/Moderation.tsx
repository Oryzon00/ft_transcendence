import { useEffect, useState } from "react";
import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";
import Header from "./Header";
import { ChannelUser } from "../../../../../layouts/ChatLayout/chat.d";
import Ban from "./Ban";
import Kick from "./Kick";
import Mute from "./Mute";
import Modo from "./Modo";

// Images

type ModerationType = {
	id: string;
};

function Moderation({ id }: ModerationType) {
	let [list, setList] = useState<ChannelUser[]>([]);

	const getListUser = () => {
		fetch(apiAddress + "/chat/channel/list", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ channelId: id })
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (res): void {
				setList(res);
			})
			.catch(function () {
				notifyError("Access denied.");
			});
	};

	useEffect(() => {
		getListUser();
	}, []);

	return (
		<div className="mx-auto w-full h-[80%]">
			<Header />
			<div className="w-[80%] m-auto mt-2 h-[90%] overflow-y-auto">
				{list?.map((e) => (
					<div className="flex flex-row justify-between items-center bg-[#282b30] text-white w-full  h-18 border-2 border-white">
						<h2 className="text-2xl">{e.user.name}</h2>
						<div className="flex flex-row">
							<Modo id={e.user.id} channelId={id} />
							<Mute id={e.user.id} channelId={id} />
							<Kick id={e.user.id} channelId={id} />
							<Ban id={e.user.id} channelId={id} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Moderation;
