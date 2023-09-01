import "./FriendsLayout.styles.css"
import FriendList from "../../components/Friends/FriendsList";

function FriendsLayout () {

	return (
	<div className="friends-main">
		<div className="friends-friendlist">
			<span>Friend demand column</span>
			<FriendList />
		</div>
		<div>
			<span>Friends column</span>
		</div>
	</div>
	)
}

export default FriendsLayout;