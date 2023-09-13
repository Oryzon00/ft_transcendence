import { useEffect, useState } from "react";
import apiAddress from "../../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../../utils/getJWT.ts";
import {throwErrorMessage} from "../../../utils/throwErrorMessage.ts";
import {notifyError} from "../../../utils/notify.ts";
import AcceptFriendButton from "./AcceptFriendButton.tsx";
import DeclineFriendButton from "./DeclineFriendButton.tsx";

function PendingFriendList () {
	const [data, setData] = useState(null); // Utiliser un array
	let listFriend = null;

	function getPendingFriends () {
		let url = apiAddress + "/user/friends/getPending";
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
				notifyError("Error while getting friend list");
			});
	}

	useEffect (() => {
		getPendingFriends();
		const interval = window.setInterval(() => {
			getPendingFriends()
		}, 500);

		return () => window.clearInterval(interval);
	}, []);

	if (data !== null) {
		listFriend = data.friends.map((friend :any) => (
			<li key={friend.id}>
				<div className="friends-friendlist-component">
					<img src={friend.image}></img>
					<div className="friends-friendlist-name">
						<p>{friend.name}</p>
					</div>
					<AcceptFriendButton friendname={friend.name} />
					<DeclineFriendButton friendname={friend.name} />
				</div>
			</li>
		));
	}

	return (
		<ul>{listFriend}</ul>

	)
}

export default PendingFriendList;