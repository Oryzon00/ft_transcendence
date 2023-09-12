import "./SocialLayout.styles.css"
import FriendList from "../../components/Social/Friends/FriendsList";
import PendingFriendList from "../../components/Social/Friends/PendingFriendsList";

function SocialLayout () {

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

export default SocialLayout;