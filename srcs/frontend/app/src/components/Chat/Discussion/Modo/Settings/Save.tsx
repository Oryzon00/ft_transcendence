import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";

type SaveType = {
	id: string;
	name: string;
	status: string;
	password: string;
};

function Save({ id, name, status, password }: SaveType) {
	const sendSetting = () => {
		fetch(apiAddress + "/chat/channel/settings", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: id,
				name: name,
				status: status,
				password: password
			})
		});
	};
	return (
		<button
			onClick={() => {
				sendSetting();
			}}
			className="w-full h-full rounded-none text-xl hover:text-[#92400e]"
		>
			SAVE
		</button>
	);
}

export default Save;
