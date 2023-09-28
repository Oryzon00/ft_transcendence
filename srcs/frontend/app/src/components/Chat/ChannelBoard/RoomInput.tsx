type RoomInputType = {
	query: string;
	setQuery: any;
	direct: boolean;
};

function RoomInput({ query, setQuery, direct }: RoomInputType) {
	return (
		<div className="flex w-11/12 h-12 space-x-4 my-2 mx-auto bg-[#2b2a33] rounded items-center">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="rounded h-full w-full outline-none px-2"
				placeholder={
					direct ? "Search for a DM..." : "Search for a room..."
				}
			/>
		</div>
	);
}

export default RoomInput;
