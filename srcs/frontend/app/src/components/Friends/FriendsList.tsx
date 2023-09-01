import { useEffect, useState } from "react";

function FriendList () {
	const [data, setData] = useState([]); // Utiliser un array

 	useEffect (() => {
		//setData(["test"]);
	});
	return (
		<span>FriendList {data}</span>
	)
}

export default FriendList;