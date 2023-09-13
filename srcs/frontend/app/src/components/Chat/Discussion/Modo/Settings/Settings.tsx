import { useState } from "react";
import Upload from "./upload-images";
import Name from "./name";
import Description from "./Description";
import Delete from "./Delete";

function Settings() {
	const [original, setOriginal] = useState("");

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [icon, setIcon] = useState("");

	return (
		<div className="w-full h-[calc(100%-8.5rem)]">
			<div className="flex w-full">
				<Upload />
				<Name name={name} setName={setName} />
			</div>
			<Description />
			<Delete />
			<button>RESET</button>
			<button>SAVE</button>
		</div>
	);
}

export default Settings;
