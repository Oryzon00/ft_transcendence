import { useContext } from "react";
import { UserContext } from "../../../utils/contexts/userContext.tsx";
import './UpdateProfilePictureButton.styles.css'
import getJwtTokenFromCookie from "../../../utils/getJWT.ts";
import { notifyError } from "../../../utils/notify.ts";
import apiAddress from "../../../utils/apiAddress.ts";
import { throwErrorMessage } from "../../../utils/throwErrorMessage.ts";

function updateProfilePictureButton() {
	const userHook = useContext(UserContext);
	if (!userHook.user) return null;
	function sendToBack (type :string, img :string) {
		const url = apiAddress + "/user/update/image";

		fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				imageType: type,
				base64Data: img
			})
		})
			.then(function (response) {
				if (!response.ok)
					throwErrorMessage(response);
				return response.json();
			})
			.then(function () {
				userHook.setUser({
					...userHook.user,
					image: img
				});
			})
			.catch(function () {
				notifyError("Image too large");
			});
	}
	const handleChange = (event: any) => {
		let FR = new FileReader();
		FR.readAsDataURL(event.target.files[0]);
		FR.onload = () => {
			sendToBack(event.target.files[0].type, String(FR.result));
		}
	};
	return (
		<div className="UpdatePfpButton">
			<img src={userHook.user.image} />
			<input
				type="file"
				accept="image/*"
				onChange={handleChange}
			/>
		</div>
	)
}

export default updateProfilePictureButton;