import TwoFARegisterButton from "../../components/Settings/TwoFA/TwoFARegisterButton/TwoFARegisterButton";
import TwoFAStatus from "../../components/Settings/TwoFA/TwoFAStatusButton/TwoFAStatus.tsx";
import TwoFATurnOffButton from "../../components/Settings/TwoFA/TwoFATurnOffButton/TwoFATurnOffButton";
import TwoFATurnOnButton from "../../components/Settings/TwoFA/TwoFATurnOnButton/TwoFATurnOnButton";
import { cookieProtection } from "../../utils/cookieProtection.ts";
import UpdateUsernameButton from "../../components/Settings/UpdateUsernameButton/UpdateUsernameButton.tsx";
import { LogOutButton } from "../../components/Settings/ButtonDeleteCookie.tsx";
import UpdateProfilePictureButton
	from "../../components/Settings/UpdateProfilePictureButton/UpdateProfilePictureButton.tsx";

function SettingsLayout() {
	cookieProtection();

	return (
		<>
			<h1> User Settings</h1>
			<LogOutButton />
			<TwoFATurnOnButton />
			<TwoFATurnOffButton />
			<TwoFARegisterButton />
			<UpdateProfilePictureButton />
			<UpdateUsernameButton />
			<TwoFAStatus />
		</>
	);
}

export default SettingsLayout;
