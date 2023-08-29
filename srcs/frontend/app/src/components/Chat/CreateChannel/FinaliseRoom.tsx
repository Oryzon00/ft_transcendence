import Photo from "../../../assets/chat/not-clicked/photo-camera.png";
function FinaliseRoom() {
	return (
		<div className="relative h-full w-full rounded-sm">
			<div className="flex flex-col justify-between h-[60%]">
				<div id="header" className="mt-8">
					<div
						id="header-text"
						className="flex flex-col justify-center items-center "
					>
						<h2 className="text-black text-3xl font-bold text-center mb-2">
							Customize your room
						</h2>
						<p className="text-center w-4/5 text-gray-700">
							Give the look you want at your new room with a name
							and an icon. You can still modify it later.
						</p>
					</div>
				</div>
				<div className="flex justify-center items-center">
					<button className="rounded-[50%] w-[100px] h-[100px] border-dashed border-3px border-[#808B96] bg-white flex justify-center items-center flex-col">
						<img src={Photo} />
						<p className="text-[#808B96]">UPLOAD</p>
					</button>
				</div>
				<div id="name" className="flex flex-col">
					<h3 className="text-[#566573] text-xl text-left w-11/12 mx-auto mb-2">
						Room name
					</h3>
					<input
						type="text"
						className="bg-[#eaecee] w-11/12 h-8 rounded-sm text-black outline-none mx-auto"
					/>
				</div>
			</div>
			<div
				id="bottom"
				className="absolute w-full h-[18%] bottom-0 inset-x-0 bg-[#eaecee] flex justify-between"
			>
				<button className="bg-[#eaecee] text-black my-auto ml-4 w-24 h-12">
					Back
				</button>
				<button className="bg-[#cf7200] text-white my-auto mr-4 w-24 h-12">
					Create
				</button>
			</div>
		</div>
	);
}

export default FinaliseRoom;
