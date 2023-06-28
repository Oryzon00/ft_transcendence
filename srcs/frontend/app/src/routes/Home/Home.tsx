import { useState } from "react";
import "./Home.styles.css";
import { api_adress } from "../../api_adress.ts";
import { cookieProtection } from "../cookieProtection.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { getJwtTokenFromCookie } from '../cookieProtection';

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
		<div className="card">
			<button onClick={getUserInfo}> getUserInfo </button>
			<div> User info: {userInfo} </div>
		</div>
	);
}



function Home() {
	cookieProtection();

	const navigate = useNavigate();
	const [count, setCount] = useState(0);

	function deleteCookie() {
		document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "userPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		self.location.href = "http://localhost:8000";
	}

	function profileButton() {
		if (self.location.href !== "http://localhost:8000/home/profile")
			navigate("/home/profile")
		else
			navigate("/home")
	}
	
	return (
		<div className="home-root">
			<div className="profile-button">
				<button onClick={() => profileButton()}>
					Profile
				</button>
			</div>
			<Outlet />
			<div className="main-site">
				<div className="card">
					<button onClick={() => setCount((count) => count + 1)}>
						truc {count}
					</button>
				</div>
				<div>Welcome home !</div>
				<User></User>
				<button onClick={() => deleteCookie()}>Delete Cookie</button>
			</div>
			<div className="my-footer">
				Footer
			</div>

		</div>
	);
}

export default Home;
