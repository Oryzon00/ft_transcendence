import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { throwErrorMessage } from "../../utils/throwErrorMessage";
import { notifyError } from "../../utils/notify";
import { ImBlocked } from 'react-icons/im'


function UnblockUserButton({username} : any) {
	function unblockUser() {
		
		let url = apiAddress + "/user/unblock";
		fetch (url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username
			})
		})
			.then(function (response) {
				if (!response.ok)
					throwErrorMessage(response);
				return response.json();
			})
			.then(function () {
				window.location.reload();
			})
			.catch(function () {
				notifyError("Error while unblocking user");
			});
	}
	return (
		<button className='profile-addfriend-button' onClick={unblockUser}><ImBlocked size='35' color='crimson'/></button>
	);
}

export default UnblockUserButton;