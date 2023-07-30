import './ProfileLayout.styles.css'
import { useLoaderData } from 'react-router';

function ProfileLayout () {
	const userData :any = useLoaderData();
		return (
			<>
				<div className='profile-main'>
					<div className="profile-div">
						<img src={userData.image}></img>
						<span className='profile-login'>Login : {userData.name} </span>
						<span className='profile-desc'>short desc</span>
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