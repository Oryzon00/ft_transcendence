import { useState } from "react";
import "./App.css";
import { db_adress } from "./db_adress";
import Auth from "./Auth/Auth.tsx";

let testBool = false;

function getJwtTokenFromCookie(): string | null {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith("JWT" + "=")) {
			const token = cookie.substring("JWT".length + 1);
			console.log(`token: ${decodeURIComponent(token)}`);
			return decodeURIComponent(token);
		}
	}
	return null; // Return null if the cookie is not found
}

function User() {
	const [userInfo, setUserInfo] = useState("No user info");
	function getUserInfo() {
		const url = db_adress + "/user/me";
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie()
			}
		})
			.then(function (response) {
				if (!response.ok) {
					console.log("response not ok");
					throw new Error(
						"Request failed with status " + response.status
					);
				}
				return response.json();
			})
			.then(function (data) {
				console.log(`private info: ${data}`);
				setUserInfo(data.private);
			})
			.catch(function (error) {
				console.log("in .catch");
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

function App() {
	const [count, setCount] = useState(0);
	const [users, setUsers] = useState("");

	if (window.location.pathname === "/auth" && !testBool) {
		testBool = true;
		const params = new URLSearchParams(window.location.search);
		const url = "http://localhost:3000/auth?" + params.toString();
		fetch(url, {
			method: "GET" //changer en post
		})
			.then((response) => {
				return response.json();
			})
			.then((token) => {
				console.log(`token = ${token}`);
				document.cookie = `JWT=${token.access_token};path=/`;
				console.log(document.cookie);
				self.location.href = "http://localhost:8000";
			});
	}

	function callBack(event: any) {
		event.preventDefault();
		fetch(db_adress + "/users", {
			method: "GET"
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setUsers(data[0].name);
			});
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
			<Auth></Auth>
			<User></User>
		</>
	);
}

export default App;
