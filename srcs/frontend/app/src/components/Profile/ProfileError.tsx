import { TbUserQuestion } from "react-icons/tb"

function ProfileError () {
	return (
		<div className="profile-error-main">
			<TbUserQuestion size='500'/>
			<span>Sorry the user you are looking for does not exist…</span>
		</div>
	)
}

export default ProfileError;