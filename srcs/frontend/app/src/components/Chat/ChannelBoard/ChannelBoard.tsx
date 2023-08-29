import { useState } from "react";
import {
	ChannelId,
	ChannelPayload,
	ListChannel
} from "../../../layouts/ChatLayout/chat.d";
import Search from "../../../assets/chat/search.png";

function searchElements(channels: ListChannel, query: string): ChannelId[] {
	let res: ChannelId[] = [];

	for (let key in channels) {
		let name: string = channels[key].name;
		if (query == "" || name.startsWith(query))
			res.push({ id: channels[key].id, name: channels[key].name });
	}
	return res;
}

type TypeChannelBoard = {
	channels: { [key: string]: ChannelPayload };
	setCurrent: any;
};

export default function ChannelBoard({
	channels,
	setCurrent
}: TypeChannelBoard) {
	const [query, setQuery] = useState("");
	const filtredItems: ChannelId[] = searchElements(channels, query);

	function changeCurrent(id: string) {
		setCurrent(id);
		setQuery("");
	}

	return (
		<div className="rounded w-full scroll-smooth hover:scroll-auto">
			<div className="flex w-11/12 h-10 space-x-4 mt-2 mx-auto bg-[#2b2a33] rounded items-center">
				<img
					src={Search}
					className="bg-[#2b2a33] w-[24px] h-[24px] ml-2 "
				/>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="rounded h-full w-full outline-none"
					placeholder="Search for a room"
				/>
			</div>
			<ul className="h-full overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
				{filtredItems.map((value) => (
					<li>
						<button
							className="w-[100%]"
							onClick={() => {
								changeCurrent(value.id);
							}}
						>
							{value.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
