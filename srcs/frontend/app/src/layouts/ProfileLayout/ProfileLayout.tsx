import './ProfileLayout.styles.css'
import { useLoaderData } from 'react-router';

function ProfileLayout () {
	const userData :any = useLoaderData();
	if (userData) {
		return (
			<>
				<div className="profile-div">
					<img src={userData.image}></img>
					<span>Login : {userData.name} </span>
					<span>Rank : </span>
					<a href="/profile/me/history">History</a>
				</div>
			</>
		);
	}
	else
		return null;
}
export default ProfileLayout;