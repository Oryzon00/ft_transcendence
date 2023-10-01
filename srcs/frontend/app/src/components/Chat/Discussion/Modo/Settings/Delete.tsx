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
		<div className="flex flex-row items-center w-11/12 h-1/3 mx-auto">
			<h2 className="px-2 w-3/12">Delete Channel :</h2>
			<button
				onClick={() => DeleteAction()}
				className="w-9/12  hover:text-[#92400e]"
			>
				DELETE
			</button>
		</div>
	);
}

export default Delete;
