import Search from "../../../assets/chat/search.png";

type RoomInputType = {
	query: string;
	setQuery: any;
};

function RoomInput({ query, setQuery }: RoomInputType) {
	return (
		<div className="flex w-11/12 h-12 space-x-4 my-2 mx-auto bg-[#2b2a33] rounded items-center">
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
	);
}

export default RoomInput;
