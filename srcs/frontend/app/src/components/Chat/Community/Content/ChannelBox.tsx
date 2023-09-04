import { ChannelPayload } from "../../../../layouts/ChatLayout/chat.d";
import apiAddress from "../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../utils/getJWT";

type ChannelBoxType = {
	channels: ChannelPayload[];
};

const fetchJoinChannel = (Channel: string, setChannel: any) => {
	fetch(apiAddress + "/chat/channel/create", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie(),
			"Content-Type": "application/json"
		},
		body: JSON.stringify(Channel)
	})
		.then(function (res: Response) {
			if (!res.ok) {
				throw new Error("Request failed with status " + res.status);
			}
			return res.json();
		})
		.then(function (e) {
			setChannel(e);
		})
		.catch(function (error) {
			notifyError(error.message);
		});
};

function ChannelBox({ channels }: ChannelBoxType) {
	return (
		<div className="flex flex-row flex-wrap justify-center overflow-y-scroll scrollbar-thick h-full w-full">
			{channels.map((value) => (
				<button className="p-1 w-[195px] h-[150px] m-[10px] leading-[150px]">
					{value.name}
				</button>
			))}
		</div>
	);
}

export default ChannelBox;
