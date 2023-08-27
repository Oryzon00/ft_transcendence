import back from "../../../assets/common/back-arrow.png";

type HeaderType = {
	onClose: any;
};

function HeaderCreateChannel({ onClose }: HeaderType) {
	return (
		<div className="flex bg-[#282b30] h-24">
			<button onClick={onClose} className="bg-[#282b30]">
				<img src={back} alt="" />
			</button>
			<p className="flex text-xl text-center justify-center items-center">
				New chat room
			</p>
		</div>
	);
}

export default HeaderCreateChannel;
