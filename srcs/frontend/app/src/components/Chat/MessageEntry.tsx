import { useState } from "react";
import { Socket } from "socket.io-client";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { notifyError } from "../../utils/notify";

type MessageEntryType = {
	current: string;
	sockets: Socket;
};
function MessageEntry({ current }: MessageEntryType) {
	const [value, setValue] = useState("");

	const sendMessage = () => {
		if (current != "") {
			fetch(apiAddress + "/chat/message", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + getJwtTokenFromCookie(),
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					authorId: 0,
					channelId: current,
					content: value
				})
			})
				.then(function (res: Response) {
					if (!res.ok) {
						throw new Error(
							"Request failed with status" + res.status
						);
					}
				})
				.catch(function (error) {
					notifyError(error.message);
				});
			setValue("");
		}
	};

	return (
		<div className="flex flex-row space-x-1 flex-none w-full justify-center">
			<input
				type="text"
				value={value}
				className="rounded-[30px] w-[80%]"
				placeholder="Taper un message"
				onChange={(e) => setValue(e.target.value)}
				maxLength={2000}
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	);
}

export default MessageEntry;
