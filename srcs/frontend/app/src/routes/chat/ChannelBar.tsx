import { useEffect, useState } from "react";

export function ChannelBar() {
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		console.log(searchText);
	})

	return (
		<>
		<input type="text" name="" id="" />
			<div id="channel-button">

			</div>
		</>
	);
}