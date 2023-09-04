import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { throwErrorMessage } from "../../utils/throwErrorMessage";
import { notifyError } from "../../utils/notify";

function AddFriendButton({friendname} : any) {
	function addFriend() {
		
		let url = apiAddress + "/user/friends/add";
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
				console.log(result.name);
			})
			.catch(function () {
				notifyError("Error while adding friend");
			});
	}
	return (
		<button onClick={addFriend}>Add Friend</button>
	);
}

export default AddFriendButton;