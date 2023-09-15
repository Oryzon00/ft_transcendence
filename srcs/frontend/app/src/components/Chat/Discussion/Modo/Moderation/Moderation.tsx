import { useEffect, useState } from "react";
import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";
import Header from "./Header";
import { ChannelUser } from "../../../../../layouts/ChatLayout/chat.d";

function Moderation() {
	let [list, setList] = useState<ChannelUser[]>([]);

	const getListUser = () => {
		fetch(apiAddress + "/chat/channel/list", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			}
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (res): void {
				setList(res);
			})
			.catch(function () {
				notifyError("Access denied.");
			});
	};

	useEffect(() => {
		console.log("value : ", list);
	}, []);

	return (
		<div className="mx-auto w-full ">
			<Header />
			<div className="bg-blue-500">
				{list?.map((e) => (
					<div className="w-full flex">{e.user.name}</div>
				))}
			</div>
		</div>
	);
}

export default Moderation;
