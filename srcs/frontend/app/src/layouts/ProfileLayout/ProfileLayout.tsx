import './ProfileLayout.styles.css'
import { useLoaderData } from 'react-router';
import {UserContext} from "../../utils/contexts/userContext.tsx";
import {useContext} from "react";
import AddFriendButton from "../../components/Profile/AddFriendButton.tsx";
import History from "../../components/Profile/History.tsx";

function ProfileLayout () {
	const userData :any = useLoaderData();
	const userHook= useContext(UserContext);
		return (
			<>
				<div className='profile-main'>
					<div className="profile-div">
						<img src={userData.image}></img>
						<span className='profile-login'>Login : {userData.name} </span>
						<span className='profile-desc'>MMR : {userData.mmr}</span>
						{ userHook.user.name !== userData.name &&  
                            <AddFriendButton
							friendname={userData.name} />
						}
					</div>
					<div className='profile-rank'>
						<span>Winrate</span>
						<span>{userData.gameProfile.wins} / {userData.gameProfile.loss}</span>
						{ userData.gameProfile.wins + userData.gameProfile.loss > 0 && 
							<span>{Math.round(((userData.gameProfile.wins) / (userData.gameProfile.wins + userData.gameProfile.loss)) * 100)}%</span>
						}
					</div>
					<div className='profile-history'>
						<History user={userData}/>
					</div>
				</div>
			</>
		);
}
export default ProfileLayout;