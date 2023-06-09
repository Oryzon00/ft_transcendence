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
				"Authorization": "Bearer " + getJwtTokenFromCookie()
			}
		})
			.then((response) => {
				console.log(`response: ${response}`);
				if (response.ok) {
					console.log("SUCCESS");
				} else {
					console.log("FAILURE");
				}
				return response.json();
			})
			.then((data) => {
				console.log(`private info: ${data}`);
				setUserInfo(data.private);
			});
	}
	return (
		<div>
			<button onClick={getUserInfo}> {userInfo} </button>
		</div>
	);
}

function App() {
	const [count, setCount] = useState(0);
	const [users, setUsers] = useState("");

	if (window.location.pathname === "/auth" && !testBool) {
		testBool = true;
		const params = new URLSearchParams(window.location.search);
		//envoyer params dans body et pas query
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
		// fetch est non bloquant --> besoin de then
		fetch(db_adress + "/users", {
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
