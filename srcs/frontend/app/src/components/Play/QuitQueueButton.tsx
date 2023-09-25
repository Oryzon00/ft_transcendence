export function QuitQueueButton({ show }: { show: boolean }) {
	function onClickButton() {
		console.log("click quit queue!");
	}
	if (!show) {
		return null;
	} else {
		return (
			<button
				className=" my-2 px-5 py-3 rounded-md hover:bg-red-800 text-white text border-white text-4xl font-semibold border-4 bg-zinc-500"
				onClick={onClickButton}
			>
				Quit Queue
			</button>
		);
	}
}
