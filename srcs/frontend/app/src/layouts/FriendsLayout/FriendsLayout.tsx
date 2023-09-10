import "./FriendsLayout.styles.css"
import FriendList from "../../components/Friends/FriendsList";
import PendingFriendList from "../../components/Friends/PendingFriendsList.tsx";

function FriendsLayout () {

	return (
	<div className="friends-main">
		<div className="friends-friendlist">
			<span>Friend column</span>
			<FriendList />
		</div>
		<div className="friends-friendlist">
			<span>Friends demand column</span>
			<PendingFriendList />
		</div>
	</div>
	)
}

export default FriendsLayout;