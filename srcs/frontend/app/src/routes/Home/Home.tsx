import { useState } from "react";
import "./Home.styles.css";
import { api_adress } from "../../api_adress.ts";
import { cookieProtection } from "../cookieProtection.ts";

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

function User() {
	const [userInfo, setUserInfo] = useState("No user info");
	function getUserInfo() {
		const url = api_adress + "/user/me";
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

function TwoFA() {
	const [twoFAStatus, setTwoFAStatus] = useState("No info on 2fa");
	function getTwoFAStatus() {
		const url = api_adress + "/user/me";
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
				console.log("check");
				if (data.twoFA === true) setTwoFAStatus("On");
				else setTwoFAStatus("Off");
			})
			.catch(function (error) {
				if (error instanceof Error) {
					const message: string = error.message;
					setTwoFAStatus(message);
				}
			});
	}

	function patchTwoFAStatus() {
		let status: boolean;
		if (twoFAStatus !== "On" && twoFAStatus !== "Off") {
			return;
		} else if (twoFAStatus === "On") status = false;
		else status = true;

		const url = api_adress + "/auth/twoFA/turn-on";
		fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				status: status
			})
		})
			.then(function (response) {
				if (!response.ok)
					throw new Response("Error", { status: response.status });
				else return response.json();
			})
			.then(function (data) {
				console.log(data.status);
				if (data.status === true) setTwoFAStatus("On");
				else setTwoFAStatus("Off");
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	return (
		<div>
			<button onClick={getTwoFAStatus}>get 2FA status </button>
			<div> 2fa status : {twoFAStatus} </div>
			<button onClick={patchTwoFAStatus}>Change status 2fa</button>
		</div>
	);
}

function Home() {
	cookieProtection();

	const [count, setCount] = useState(0);

	function deleteCookie() {
		document.cookie =
			"JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		self.location.href = "http://localhost:8000";
	}

	return (
		<>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					truc {count}
				</button>
			</div>
			<div>Welcome home !</div>
			<User></User>
			<TwoFA></TwoFA>
			<button onClick={() => deleteCookie()}>Delete Cookie</button>
		</>
	);
}

export default Home;
