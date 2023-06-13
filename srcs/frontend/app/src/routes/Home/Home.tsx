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
					throw new Error("Request failed with status " + response.status);
				}
				return response.json();
			})
			.then(function (data) {
				setUserInfo(data.private);
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

function Home() {
	cookieProtection();

	const [count, setCount] = useState(0);
	const [users, setUsers] = useState("");

	function callBack(event: any) {
		event.preventDefault();
		// fetch est non bloquant --> besoin de then
		fetch(api_adress + "/users", {
			method: "GET"
		})
			.then((response) => {
				//Transforme le contenu de la reponse en JSON
				return response.json();
			})
			.then((data) => {
				setUsers(data[0].name);
			});
	}

	function deleteCookie() {
		document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		self.location.href = "http://localhost:8000";
	}

	return (
		<>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					truc {count}
				</button>
			</div>
			<button onClick={callBack}>Call back</button>
			<div>First user is {users}</div>
			<div>Welcome home {decodeURIComponent(document.cookie).split("=")[1]}</div>
			<User></User>
			<button onClick={() => deleteCookie()}>Delete Cookie</button>
		</>
	);
}

export default Home;
