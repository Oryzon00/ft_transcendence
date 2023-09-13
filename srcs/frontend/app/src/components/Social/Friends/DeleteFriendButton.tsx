import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { throwErrorMessage } from "../../../utils/throwErrorMessage";
import { notifyError, notifyInfo } from "../../../utils/notify";

function DeleteFriendButton({friendname} : any) {
	function deleteFriend() {

		let url = apiAddress + "/user/friends/delete";
		fetch (url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: friendname
			})
		})
			.then(function (response) {
				if (!response.ok)
					throwErrorMessage(response);
				return response.json();
			})
			.then(function (result) {
				notifyInfo(result.name + " has been deleted !");
			})
			.catch(function () {
				notifyError("Error while deleting friend");
			});
	}
	return (
		<button onClick={deleteFriend}>❌</button>
	);
}

export default DeleteFriendButton;