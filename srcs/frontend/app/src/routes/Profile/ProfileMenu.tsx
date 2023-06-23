//import ProfileButtonProps from "./TProfileButton";
import './ProfileMenu.styles.css'
import { useLoaderData } from 'react-router';

function getJwtTokenFromCookie(): string | null {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith("JWT" + "=")) {
			const token = cookie.substring("JWT".length + 1);
			return decodeURIComponent(token);
		}
	}
	return null;
}

export function ProfileMenuLoader () {
	const url = "http://localhost:3000/user/me";
	const data = fetch(url, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie()
		}
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Request failed with status " + response.status);
			}
			return response.json();
		})
		.then((data) => {
			return (data);
		})
		.catch((error) => {
			if (error instanceof Error) {
				return (null);
			}
		});
	return (data);
}

function ProfileMenu (/*{toggle}: ProfileButtonProps*/) {
	const userData :any = useLoaderData();
	if (userData) {	
		return (
			<>
				<div className="profile-div">
					<img src={userData.image}></img>
					<span>Login : {userData.name} </span>
					<span>Rank : </span>
					<a href="/profile/me/history">History</a>
				</div>
			</>
		);
	}
	else 
		return null;
}

export default ProfileMenu;