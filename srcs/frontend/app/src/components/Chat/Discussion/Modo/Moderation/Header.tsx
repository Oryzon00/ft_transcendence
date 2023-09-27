type HeaderType = {
	query: string;
	setQuery: any;
};

function Header({ query, setQuery }: HeaderType) {
	return (
		<div id="header" className="flex w-full h-10 justify-center mt-2">
			<input
				type="text"
				className="bg-[#424549] rounded-2xl outline-none w-[90%] h-full px-4 mx-auto"
				placeholder="Search User..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</div>
	);
}

export default Header;
