import TwoFAStatus from "./TwoFA/TwoFAStatusButton/TwoFAStatus";
import TwoFARegisterButton from "./TwoFA/TwoFARegisterButton/TwoFARegisterButton";
import TwoFATurnOffButton from "./TwoFA/TwoFATurnOffButton/TwoFATurnOffButton";
import TwoFATurnOnButton from "./TwoFA/TwoFATurnOnButton/TwoFATurnOnButton";

export function TwoFASettings() {
	return (
		<div className="w-96 border-4">
			<h3> 2FA settings </h3>
			<TwoFAStatus />
			<TwoFATurnOnButton />
			<TwoFATurnOffButton />
			<TwoFARegisterButton />
		</div>
	);
}
