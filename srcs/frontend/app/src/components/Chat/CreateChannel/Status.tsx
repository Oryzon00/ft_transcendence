import PrivateButton from "./PrivateButton";
import PublicButton from "./PublicButton";

function Status() {
	return (
		<>
			<div id="header" className="mt-8">
				<div id="header-text" className="flex flex-col items-center">
					<h2 className="text-black text-3xl font-bold">
						Create Room
					</h2>
					<p className="text-slate-400 text-sl">
						Choose the status of your new room
					</p>
				</div>
			</div>
			<div
				id="status"
				className="flex flex-col space-y-2 items-center h-full justify-center"
			>
				<PublicButton />
				<PrivateButton />
			</div>
		</>
	);
}

export default Status;
