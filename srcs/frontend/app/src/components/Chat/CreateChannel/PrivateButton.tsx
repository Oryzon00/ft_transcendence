import Padlock from "../../../assets/chat/not-clicked/padlock.png";

function PrivateButton() {
	return (
		<button className="w-9/12 flex flex-col justify-center items-center">
			<img src={Padlock} alt="white padlock" className="w-32" />
			<p className="text-lg">Private</p>
		</button>
	);
}

export default PrivateButton;
