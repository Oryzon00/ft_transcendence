import Cross from "../../../assets/common/cross.png";
import FinaliseRoom from "./FinaliseRoom";
import Status from "./Status";

type CreateChannelType = {
	togglemodal: any;
};

function CreateChannel({ togglemodal }: CreateChannelType) {
	return (
		<div
			id="create-channel"
			className="flex flex-col bg-white w-[440px] h-[550px] relative rounded"
			onClick={() => {}}
		>
			<button
				className="bg-white absolute top-3 right-1"
				onClick={togglemodal}
			>
				<img src={Cross} alt="" />
			</button>
			<FinaliseRoom />
		</div>
	);
}

export default CreateChannel;
