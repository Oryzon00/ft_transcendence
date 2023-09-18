import Image from "../../../../assets/chat/not-clicked/quit.png";

const quitFetch = (id: string) => {};

function Quit() {
	return (
		<button className="bg-[#282b30]" onClick={() => quitFetch()}>
			<img src={Image} />
		</button>
	);
}

export default Quit;
