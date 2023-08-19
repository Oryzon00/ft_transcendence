import UpdateUsernameButton from "./UpdateUsernameButton/UpdateUsernameButton";
import UpdateProfilePictureButton from "./UpdateProfilePictureButton/UpdateProfilePictureButton";

export function ProfileSettings() {
	return (
		<div className="w-96">
			<h3> Profile </h3>
			<UpdateProfilePictureButton />
			<UpdateUsernameButton />
		</div>
	);
}
