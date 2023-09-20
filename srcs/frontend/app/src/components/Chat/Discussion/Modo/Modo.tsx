import { useState } from "react";
import ButtonHeader from "./ButtonHeader";
import Settings from "./Settings/Settings";
import Moderation from "./Moderation/Moderation";

function Modo() {
	const [vue, setVue] = useState(false);

	return (
		<div className="w-full h-[calc(100%-4rem)]">
			<ButtonHeader vue={vue} setVue={setVue} />
			{vue ? <Moderation /> : <Settings />}
		</div>
	);
}

export default Modo;
