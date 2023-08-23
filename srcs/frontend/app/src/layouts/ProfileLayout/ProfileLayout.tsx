import './ProfileLayout.styles.css'
import { useLoaderData } from 'react-router';
import {UserContext} from "../../utils/contexts/userContext.tsx";
import {useContext} from "react";
import AddFriendButton from "../../components/Profile/AddFriendButton.tsx";

function ProfileLayout () {
	const userData :any = useLoaderData();
	const userHook= useContext(UserContext);
		return (
			<>
				<div className='profile-main'>
					<div className="profile-div">
						<img src={userData.image}></img>
						<span className='profile-login'>Login : {userData.name} </span>
						<span className='profile-desc'>short desc</span>
						{ userHook.user.name !== userData.name &&
                            <AddFriendButton
	                            user={userHook.user}
	                            friendname={userData.name} />
						}
					</div>
					<div className='profile-rank'>
						<span>Rank : 1</span>
						<span>0 / 0</span>
						<span>WL</span>
					</div>
					<div className='profile-leaderboard'>
						leaderboard
					</div>
					<div className='profile-history'>
						history
					</div>
				</div>
			</>
		);
}
export default ProfileLayout;