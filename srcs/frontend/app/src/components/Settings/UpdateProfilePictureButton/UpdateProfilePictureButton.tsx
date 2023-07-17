import { useContext, useState } from "react";
import { UserContext } from "../../../utils/contexts/userContext.tsx";
import './UpdateProfilePictureButton.styles.css'
import getJwtTokenFromCookie from "../../../utils/getJWT.ts";
import { notifyError } from "../../../utils/notify.ts";
import apiAddress from "../../../utils/apiAddress.ts";

function updateProfilePictureButton() {
	const userHook = useContext(UserContext);
	if (!userHook.user) return null;

	function sendToBack (type :string, data :string) {
		const url = apiAddress + "/user/update/image";

		fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				imageType: type,
				base64Data: data
			})
		})
			.then(function (response) {
				if (!response.ok)
					throw new Error(
						"Request failed with status " + response.status
					);
				return response.json();
			})
			.then(function (data) {
				userHook.setUser({
					...userHook.user,
					image: data.image
				});
			})
			.catch(function (error) {
				notifyError(error.message);
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