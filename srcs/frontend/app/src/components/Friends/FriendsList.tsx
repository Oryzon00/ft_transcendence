import { useEffect, useState } from "react";
import apiAddress from "../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import {throwErrorMessage} from "../../utils/throwErrorMessage.ts";
import {notifyError} from "../../utils/notify.ts";

function FriendList () {
	const [data, setData] = useState(null); // Utiliser un array
	let listFriend = null;
 	useEffect (() => {
	    let url = apiAddress + "/user/friends/get";
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
			    notifyError("Error while getting friend");
		    });
	}, []);
	 if (data !== null) {
		 listFriend = data.friends.map((friend) => (
			 <li key={friend.id}>
				 <div className="friends-friendlist-component">
				        <img src={friend.image}></img>
					    <div className="friends-friendlist-name">
						    <p>{friend.name}</p>
					    </div>
				 </div>
			 </li>
		 ));
	 }

	return (
		<ul>{listFriend}</ul>

	)
}

export default FriendList;