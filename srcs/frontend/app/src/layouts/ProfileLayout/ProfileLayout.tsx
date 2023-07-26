import './ProfileLayout.styles.css'
import { useLoaderData } from 'react-router';
import ProfileButton from "../../components/Home/ProfileButton.tsx";
function ProfileLayout () {
	const userData :any = useLoaderData();
		return (
			<>
				<div className='profile-main'>
					<div className="profile-div">
						<img src={userData.image}></img>
						<span>Login : {userData.name} </span>
						<span>Rank : </span>
						<a href="/profile/me/history">History</a>
					</div>
					<ProfileButton />
				</div>
			</>
		);
}
export default ProfileLayout;