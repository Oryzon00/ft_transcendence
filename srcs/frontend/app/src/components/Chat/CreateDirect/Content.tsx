import { Friends } from "../../../layouts/ChatLayout/chat.d";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";

type ContentType = {
	friends: Friends[];
	togglemodal: any;
};

const createDirectMessage = (id: number) => {
	fetch(apiAddress + "/chat/channel/direct", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie(),
			"Content-type": "application/json"
		},
		body: JSON.stringify({ id: String(id) })
	})
		.then(function (res: Response) {
			if (!res.ok) {
				throw new Error("Request failed with status " + res.status);
			}
			return res.json();
		})
		.then(function () {})
		.catch(function (error) {
			notifyError(error.message);
		});
};

function Content({ friends, togglemodal }: ContentType) {
	return (
		<div className="bg-[#27272a] h-[70%] w-[90%] overflow-y-scroll gap-x-2 m-auto">
			{friends.map((friend) => (
				<div
					className="flex flex-row items-center gap-x-3 border-2 cursor-pointer"
					onClick={() => {
						createDirectMessage(friend.id);
						togglemodal();
					}}
				>
					<img
						src={friend.image}
						className="h-12 w-12 rounded-full mb-2 cursor-pointer"
					/>
					<p className="text-3xl font-bold text-center w-full">
						{friend.name}
					</p>
				</div>
			))}
		</div>
	);
}

export default Content;
