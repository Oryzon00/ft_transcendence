type HeaderType = {
	togglemodal: any;
};
function Header({ togglemodal }: HeaderType) {
	return (
		<div className="flex justify-between px-3 w-full h-[10%] bg-[#eaecee]">
			<h2 className="bg-[#eaecee] text-black text-4xl rounded-md flex items-center">
				Community
			</h2>
			<div className="h-full flex flex-row items-center">
				<button
					onClick={() => {
						togglemodal();
					}}
				></button>
			</div>
		</div>
	);
}

export default Header;
