import { useState } from "react";
import Select from "react-select";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";

function SettingsBox({ current, setValue }: any) {
	const [password, setPassword] = useState("");
	const options = [
		{ label: "public", value: "public" },
		{ label: "private", value: "private" },
		{ label: "protect", value: "protect" }
	];
	const getChannelInfo = () => {
		fetch(apiAddress + "/chat/get", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie()
			}
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json;
			})
			.then(function (data) {
				setChannel(data);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	const sendChannelChange = () => {
		fetch(apiAddress);
	};

	const [channel, setChannel] = useState(getChannelInfo());

	return (
		<div>
			<button onClick={() => setValue(0)}>return</button>
			<div>
				<h2>Status</h2>
				<Select options={options} />
			</div>
			<div>
				<h2>Password</h2>
				<input
					type="text"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button>Save</button>
		</div>
	);
}

export default SettingsBox;
