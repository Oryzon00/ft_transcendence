import Globe from "../../../assets/chat/not-clicked/global.png";

function PublicButton() {
	return (
		<button className="w-9/12 flex flex-col  items-center justify-around">
			<img src={Globe} alt="white global" className="w-32" />
			<p className="text-lg">Public</p>
		</button>
	);
}

export default PublicButton;
