import PrivateButton from "./PrivateButton";
import PublicButton from "./PublicButton";

import Cross from "../../../assets/common/cross.png"

type CreateChannelType = {
	togglemodal: any;
};

function CreateChannel({togglemodal} : CreateChannelType) {
    return (
		<div id="create-channel" className="flex flex-col bg-white w-[440px] h-[550px] relative rounded" onClick={() => {}}>
			<div id="header" className="mt-8">
				<div id="header-text" className="flex flex-col items-center">
					<h2 className="text-black text-3xl font-bold">Create Room</h2>
					<p className="text-slate-400 text-sl">Choose the status of your new room</p>
				</div>
				<button className="bg-white absolute top-3 right-1">
					<img src={Cross} alt="" onClick={togglemodal}/>
				</button>
			</div>
			<div
				id="status"
				className="flex flex-col space-y-2 items-center h-full justify-center"
			>
				<PublicButton />
				<PrivateButton />
			</div>
		</div>
    );
}

export default CreateChannel;