function Header() {
	return (
		<div id="header" className="flex w-full h-10 justify-center mt-2">
			<input
				type="text"
				className="bg-[#424549] rounded-2xl outline-none w-[90%] h-full px-4 mx-auto"
				placeholder="Search User..."
			/>
		</div>
	);
}

export default Header;
