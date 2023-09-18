import './ProfileLayout.styles.css'
import { useLoaderData } from 'react-router';
import {UserContext} from "../../utils/contexts/userContext.tsx";
import {useContext} from "react";
import AddFriendButton from "../../components/Profile/AddFriendButton.tsx";
import History from "../../components/Profile/History.tsx";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function ProfileLayout () {
	const userData :any = useLoaderData();
	const userHook= useContext(UserContext);


	const winrate = Math.round(((userData.gameProfile.gameWons.length) / (userData.gameProfile.history.length)) * 100)

	function isFriend () {
		for (const friend of userData.friends) {
			if (friend.id === userHook.user.id)
				return (true);
		}
		return (false);
	}

		return (
			<>
				<div className='profile-main'>
					<div className='profile-first-part'>			
						<div className='profile-data'>
								<img src={userData.image}></img>
								<div className='profile-text'>
									<span className='profile-text-login'>{userData.name}</span>
									<span className='profile-text-mmr'>MMR : {userData.mmr}</span>
								</div>
								{ userHook.user.name !== userData.name && !isFriend() &&  
                    	    	    <AddFriendButton
									friendname={userData.name} />
								}
						</div>
						<div className='profile-winrate'>
							<h2>Winrate</h2>
							{ userData.gameProfile.history.length > 0 && 
								<div style={{width: 250, height: 250}}>
									<CircularProgressbar 
										value={winrate} 
										text={`${winrate}%`}
										styles={buildStyles({									
											// Can specify path transition in more detail, or remove it entirely
											// pathTransition: 'none',
										
											// Colors
											pathColor: `rgba(144, 238, 144)`,
											textColor: winrate >= 50 ? 'rgba(144, 238, 144)' : 'rgba(240, 128, 128)',
											trailColor: 'rgba(240, 128, 128)',
											backgroundColor: '#3e98c7',
										  })} 
									/>
								</div>
							}
							<h3>Total games : {userData.gameProfile.history.length}</h3>
						</div>
					</div>
					<div className='profile-other-part'>
						<h1>History</h1>
						<div className='profile-history'>
							<History user={userData}/>
						</div>
					</div>
				</div>
			</>
		);
}
export default ProfileLayout;