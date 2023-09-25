
type RoomInputType = {
	query: string;
	setQuery: any;
	direct: boolean
};

function RoomInput({ query, setQuery, direct }: RoomInputType) {
	return (
		<div className="flex w-11/12 h-12 space-x-4 my-2 mx-auto bg-[#2b2a33] rounded items-center">
			<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg-[#2b2a33] w-[24px] h-[24px] ml-2 ">
				<path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#989eaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="rounded h-full w-full outline-none"
				placeholder={direct ? "Search for a DM" : "Search for a room"}
			/>
		</div>
	);
}

export default RoomInput;
