import { useEffect, useState } from "react";
import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";
import Header from "./Header";
import { Ban, ChannelUser } from "../../../../../layouts/ChatLayout/chat.d";
import Profile from "./Profile";
import ActionModo from "./ActionModo";

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
	const [banList, setBanList] = useState<Ban[]>([]);
	const [type, setType] = useState<boolean>(false);
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
					throw new Error("Access denied.");
				}
				return res.json();
			})
			.then(function (res): void {
				setList(res);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	const getListBan = () => {
		fetch(apiAddress + "/chat/channel/list/ban", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ channelId: id })
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Access denied.");
				}
				return res.json();
			})
			.then(function (res): void {
				setBanList(res);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	useEffect(() => {
		getListUser();
		getListBan();
	}, []);

	return (
		<div className="mx-auto w-full h-[80%]">
			<Header
				query={query}
				setQuery={setQuery}
				type={type}
				setType={setType}
			/>
			<div className="w-[90%] m-auto mt-2 h-[90%] overflow-y-auto">
				<ul>
					{type
						? list?.map((e) => (
								<li
									key={e.user.id}
									className="flex flex-row justify-between items-center bg-[#282b30] text-white w-full  h-18 border-2 border-white"
								>
									<Profile user={e.user} />
									<ActionModo user={e} id={id} />
								</li>
						  ))
						: banList?.map((e) => <li key={e.id}> </li>)}
				</ul>
			</div>
		</div>
	);
}

export default Moderation;
