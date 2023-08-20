import UpdateUsernameButton from "./UpdateUsernameButton/UpdateUsernameButton";
import UpdateProfilePictureButton from "./UpdateProfilePictureButton/UpdateProfilePictureButton";

export function ProfileSettings() {
	return (
		<div className="flex flex-col w-96 border-4 items-center justify-center bg-zinc-700 px-2 py-2 rounded-md">
			<h2 className="text-white text-xl font-bold py-2"> User settings </h2>
			<UpdateUsernameButton />
			<UpdateProfilePictureButton />
		</div>
	);
}
