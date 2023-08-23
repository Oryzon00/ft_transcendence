function AddFriendButton({user, friendname}) {
	function handleClick() {
		console.log(user.name);
		console.log(friendname);
	}
	return (
		<button onClick={handleClick}>Add Friend</button>
	);
}

export default AddFriendButton;