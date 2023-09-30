import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";

type DeleteType = {
	id: string;
};

function Delete({ id }: DeleteType) {
	const DeleteAction = () => {
		fetch(apiAddress + "/chat/channel/delete", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: id })
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Couldn't delete channel");
				}
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	return (
		<div>
			<h2>Delete Channel</h2>
			<button onClick={() => DeleteAction()}>DELETE</button>
		</div>
	);
}

export default Delete;
