import { useState } from "react";
import "./Home.styles.css";
import { cookieProtection } from "../cookieProtection.ts";
import { useNavigate } from "react-router";
import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import apiAddress from "../../utils/apiAddress.ts";

function User() {
	const [userInfo, setUserInfo] = useState("No user info");
	function getUserInfo() {
		const url = apiAddress + "/user/me";
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie()
			}
		})
			.then(function (response) {
				if (!response.ok) {
					throw new Error(
						"Request failed with status " + response.status
					);
				}
				return response.json();
			})
			.then(function (data) {
				setUserInfo(data.name);
			})
			.catch(function (error) {
				if (error instanceof Error) {
					const message: string = error.message;
					setUserInfo(message);
				}
			});
	}
	return (
		<div>
			<button onClick={getUserInfo}> getUserInfo </button>
			<div> User info: {userInfo} </div>
		</div>
	);
}

function Button2FA() {
	const navigate = useNavigate();
	function goTo2FA() {
		navigate("/2FA");
	}
	return (
		<div>
			<button onClick={goTo2FA}> Go to 2FA </button>
		</div>
	);
}

function Home() {
	cookieProtection();

	function deleteCookie() {
		document.cookie =
			"JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		self.location.href = "http://localhost:8000";
	}

	return (
		<>
			<div>Welcome to home !</div>
			<User></User>
			<button onClick={() => deleteCookie()}>Delete Cookie</button>
			<Button2FA></Button2FA>
		</>
	);
}

export default Home;
