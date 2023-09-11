import { useEffect, useState } from "react";
import apiAddress from "../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import {throwErrorMessage} from "../../utils/throwErrorMessage.ts";
import {notifyError} from "../../utils/notify.ts";
import ViewProfileButton from "./ViewProfileButton.tsx";

function Leaderboard () {
	const [data, setData] = useState(null); // Utiliser un array
	let leaderboardList = null;

	function getLeaderboard () {
		let url = apiAddress + "/user/leaderboard";
		fetch (url, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
		})
			.then(function (response) {
				if (!response.ok)
					throwErrorMessage(response);
				return response.json();
			})
			.then(function (result) {
				setData(result);
			})
			.catch(function () {
				notifyError("Error while getting leaderboard");
			});
	}

 	useEffect (() => {
		getLeaderboard();
		const interval = window.setInterval(() => {
			getLeaderboard()
		}, 1000);

		return () => window.clearInterval(interval);
	}, []);

	 if (data !== null) {
		let rank = 1;
		 leaderboardList = data.leaderboard.map(
			(currentUser :any) => (
				 <li key={currentUser.id}>
					 <div className={rank === 1 || rank === 2 || rank === 3 ? "leaderboard-" + rank : "leaderboard-component"}>
					        <img src={currentUser.image}></img>
						    <div className="leaderboard-name">
							    <p>{currentUser.name}</p>
								<p>Rank: {rank++}</p>
						    </div>
							<div className="leaderboard-winrate">
								<p>W/L</p>
								<p>0/0</p>
							</div>
							<div>
								<ViewProfileButton username={currentUser.name} />
							</div>
					 </div>
				 </li>
		 ));
	 }

	return (
		<div className="leaderboard-default">
			<ul>{leaderboardList}</ul>
		</div>


	)
}

export default Leaderboard;