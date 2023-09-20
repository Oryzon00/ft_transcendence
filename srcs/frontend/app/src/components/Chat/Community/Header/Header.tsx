// Images
import GlobeLock from "../../../../assets/chat/global-lock.png";
import Globe from "../../../../assets/chat/global(2).png";
import Lock from "../../../../assets/chat/lock.png";
import Cross from "../../../../assets/common/cross.png";
import Refresh from "../../../../assets/chat/refresh.png";
import NavButton from "./NavButton";
import { useState } from "react";

type HeaderType = {
	togglemodal: any;
	refresh: any;
};
function Header({ togglemodal, refresh }: HeaderType) {
	const [index, setIndex] = useState(0);
	const status: String[] = [GlobeLock, Globe, Lock];
	const description: string[] = ["All", "Public", "Protected"];
	const [current, setCurrent] = useState(status[index]);

	return (
		<div className="flex justify-between px-3 w-full h-[10%] bg-[#eaecee] rounded-md">
			<h2 className="bg-[#eaecee] text-black text-4xl rounded-md flex items-center">
				Community
			</h2>
			<div className="h-full flex flex-row items-center">
				<NavButton
					Image={current}
					action={() => {
						setIndex((index + 1) % 3);
						setCurrent(status[index]);
					}}
					description={description[index]}
				/>
				<NavButton Image={Refresh} action={refresh} />
				<NavButton Image={Cross} action={togglemodal} />
			</div>
		</div>
	);
}

export default Header;
