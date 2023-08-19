import { LogOutButton } from "../../components/Settings/ButtonDeleteCookie.tsx";
import { ProfileSettings } from "../../components/Settings/ProfileSettings.tsx";
import { TwoFASettings } from "../../components/Settings/TwoFASettings.tsx";

function SettingsLayout() {
	return (
		<div className="flex flex-col justify-around h-[calc(100vh-80px)]">
			<div className="flex justify-around flex-wrap">
				<ProfileSettings />
				<TwoFASettings />
			</div>
			<div className="flex justify-center">
				<LogOutButton />
			</div>
		</div>
	);
}

export default SettingsLayout;
