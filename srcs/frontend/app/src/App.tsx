import { useState } from "react";
import "./App.css";
import { db_adress } from "./db_adress";
import Auth from "./Auth/Auth.tsx";

let testBool = false;

function App() {
	const [count, setCount] = useState(0);
	const [users, setUsers] = useState("");
	console.log("TEEEST1")
	console.log(`testBool = ${testBool}`)
	console.log(`path = ${window.location.pathname}`);

	if (window.location.pathname === "/auth" && !testBool) {
		console.log("TEEEST2")
		//&& login === "Not Connected") {
		testBool = true;
		const params = new URLSearchParams(window.location.search);
		//envoyer params dans body et pas query
		const url = "http://localhost:3000/auth?" + params.toString();
		fetch(url, {
			method: "GET" //changer en post
		})
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((token) => {
				console.log(token);
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
		</>
	);
}

export default App;
