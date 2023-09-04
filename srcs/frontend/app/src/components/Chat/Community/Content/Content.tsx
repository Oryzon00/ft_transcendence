import { useState } from "react";
import { ChannelPayload } from "../../../../layouts/ChatLayout/chat.d";
import SearchBar from "./SearchBar";
import ChannelBox from "./ChannelBox";

type ContentType = {
	channels: ChannelPayload[];
};

function searchElements(
	channels: ChannelPayload[],
	query: string
): ChannelPayload[] {
	let res: ChannelPayload[] = [];

	for (let i = 0; i < channels.length; i++) {
		let name: string = channels[i].name;
		if (query == "" || name.includes(query)) res.push(channels[i]);
	}
	return res;
}

function Content({ channels }: ContentType) {
	const [query, setQuery] = useState("");
	const filtredItems: ChannelPayload[] = searchElements(channels, query);

	return (
		<div className="flex flex-col items-center h-[90%]">
			<SearchBar query={query} setQuery={setQuery} />
			<ChannelBox channels={filtredItems} />
		</div>
	);
}

export default Content;
