// import { useState } from "react";
// import apiAddress from "../../utils/apiAddress";
// import getJwtTokenFromCookie from "../../utils/getJWT";
// import { notifyError } from "../../utils/notify";
// import { throwErrorMessage } from "../../utils/throwErrorMessage";

// function User() {
// 	const [userInfo, setUserInfo] = useState("No user info");
// 	function getUserInfo() {
// 		const url = apiAddress + "/user/me";
// 		fetch(url, {
// 			method: "GET",
// 			headers: {
// 				Authorization: "Bearer " + getJwtTokenFromCookie()
// 			}
// 		})
// 			.then(function (response) {
// 				if (!response.ok) throwErrorMessage(response);
// 				return response.json();
// 			})
// 			.then(function (data) {
// 				setUserInfo(data.name);
// 			})
// 			.catch(function (error) {
// 				notifyError(error.message);
// 				//supprimer ca?
// 				if (error instanceof Error) {
// 					const message: string = error.message;
// 					setUserInfo(message);
// 				}
// 			});
// 	}
// 	return (
// 		<div className="card">
// 			<button onClick={getUserInfo}> getUserInfo </button>
// 			<div> User info: {userInfo} </div>
// 		</div>
// 	);
// }

// export default User;
