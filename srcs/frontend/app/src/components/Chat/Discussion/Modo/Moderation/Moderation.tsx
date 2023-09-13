import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";
import Header from "./Header";

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
		.then(function (res: Response) {})
		.catch(function () {
			notifyError("Access denied.");
		});
};

function Moderation() {
	return (
		<div className="mx-auto w-full bg-slate-600">
			<Header />
			<div id="content"></div>
		</div>
	);
}

export default Moderation;
