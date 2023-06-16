import { useState } from "react";
import "./Home.styles.css";
import { api_adress } from "../../api_adress.ts";
import { cookieProtection } from "../cookieProtection.ts";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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

	const [count, setCount] = useState(0);

	function deleteCookie() {
		document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		self.location.href = "http://localhost:8000";
	}

	return (
		<>
			<div className="profile-button">
				<Button variant="contained" href="/home/profile">Profile</Button>
			</div>
			<div className="main-site">
				<div className="card">
					<button onClick={() => setCount((count) => count + 1)}>
						truc {count}
					</button>
				</div>
				<div>Welcome home !</div>
				<User></User>
				<button onClick={() => deleteCookie()}>Delete Cookie</button>
				<Box
    			  sx={{
    			    width: 300,
    			    height: 300,
    			    backgroundColor: 'primary.dark',
    			    '&:hover': {
    			      backgroundColor: 'primary.main',
    			      opacity: [0.9, 0.8, 0.7],
    			    },
    			  }}
    			/>
			</div>
			<div className="my-footer">
				Footer
			</div>

		</>
	);
}

export default Home;
