import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { db_adress } from "./db_adress";

function App() {
	const [count, setCount] = useState(0);
	const [users, setUsers] = useState("");

	function callBack(event: any) {
		event.preventDefault();
		// fetch est non bloquant --> besoin de then
		fetch(db_adress, {
			// a mettre dans une variable a import // export
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
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					truc {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
			<button onClick={callBack}>Call back</button>
			{users}
		</>
	);
}

export default App;
