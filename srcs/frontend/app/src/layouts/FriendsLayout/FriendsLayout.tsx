import "./FriendsLayout.styles.css"
import FriendList from "../../components/Friends/FriendsList";

function FriendsLayout () {

	return (
	<div className="friends-main">
		<div className="friends-friendlist">
			<span>Friend column</span>
			<FriendList />
		</div>
		<div>
			<span>Friends demand column</span>
		</div>
	</div>
	)
}

export default FriendsLayout;