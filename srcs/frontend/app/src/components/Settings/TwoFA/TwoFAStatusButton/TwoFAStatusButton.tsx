import { useContext } from "react";
import { UserContext } from "../../../../utils/contexts/userContext/userContext";

function TwoFAStatus() {
	const userHook = useContext(UserContext);
	console.log({
		userHook
	})
	if (!userHook) return null;
	return (
		<div>
			<div> 2fa status : {userHook.user.is2FAOn ? "true" : "false"} </div>
		</div>
	);
}

export default TwoFAStatus;
