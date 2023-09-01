import { useEffect, useState } from "react";
import {
	ChannelId,
	ChannelPayload,
	ListChannel
} from "../../../layouts/ChatLayout/chat.d";
import RoomInput from "./RoomInput";
import ChannelList from "./ChannelList";

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
	current: string;
	setCurrent: any;
};

export default function ChannelBoard({
	channels,
	setCurrent,
	current,
}: TypeChannelBoard) {
	const [query, setQuery] = useState("");
	const filtredItems: ChannelId[] = searchElements(channels, query);

	function changeCurrent(id: string) {
		setCurrent(id);
		console.log(current);
		setQuery("");
	}

	return (
		<div className="rounded h-full w-full scroll-smooth hover:scroll-auto">
			<RoomInput query={query} setQuery={setQuery}/>
			<ChannelList filtredItems={filtredItems} changeCurrent={changeCurrent} current={current}/>
		</div>
	);
}
