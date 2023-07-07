import TwoFARegisterButton from "../../components/Settings/TwoFA/TwoFARegisterButton/TwoFARegisterButton";
import TwoFAStatusButton from "../../components/Settings/TwoFA/TwoFAStatusButton/TwoFAStatusButton";
import TwoFATurnOffButton from "../../components/Settings/TwoFA/TwoFATurnOffButton/TwoFATurnOffButton";
import TwoFATurnOnButton from "../../components/Settings/TwoFA/TwoFATurnOnButton/TwoFATurnOnButton";
import { cookieProtection } from "../../utils/cookieProtection.ts";

function SettingsLayout() {
	cookieProtection();
	return (
		<>
			<h1> User Settings</h1>
			<TwoFAStatusButton />
			<TwoFATurnOnButton />
			<TwoFATurnOffButton />
			<TwoFARegisterButton />
		</>
	);
}

export default SettingsLayout;
