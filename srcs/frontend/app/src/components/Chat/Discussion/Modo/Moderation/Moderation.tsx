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

function searchElements(list: ChannelUser[], query: string): ChannelUser[] {
	let res: ChannelUser[] = [];

	for (let key in list) {
		if (query == "" || key.includes(query)) res.push(key);
	}
	return res;
}

function Moderation({ id }: ModerationType) {
	const [list, setList] = useState<ChannelUser[]>([]);
	let allMembers: ChannelUser[] = [];
	const [query, setQuery] = useState<string>("");

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
			<Header query={query} setQuery={setQuery} />
			<div className="w-[80%] m-auto mt-2 h-[90%] overflow-y-auto">
				<ul>
					{list?.map((e) => (
						<li key={e.user.id}>
							<div className="flex flex-row justify-between items-center bg-[#282b30] text-white w-full  h-18 border-2 border-white">
								<div className="flex flex-row items-center p-2">
									<img
										src={e.user.image}
										alt=""
										className="h-12 w-12 rounded-full"
									/>
									<h2 className="text-2xl px-2">
										{e.user.name}
									</h2>
								</div>
								<div className="flex flex-row flex-wrap rounded-none">
									<Modo
										id={e.user.id}
										channelId={id}
										isOwner={e.channel.ownerId == e.user.id}
										isModo={e.isAdmin}
									/>
									<Mute id={e.user.id} channelId={id} />
									<Kick id={e.user.id} channelId={id} />
									<Ban id={e.user.id} channelId={id} />
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Moderation;
