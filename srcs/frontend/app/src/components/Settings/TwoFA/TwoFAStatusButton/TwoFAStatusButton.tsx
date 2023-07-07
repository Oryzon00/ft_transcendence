import { useContext } from "react";
import UserContext from "../../../../utils/contexts/userContext";

function TwoFAStatus() {
	const user = useContext(UserContext)
	return (
		<div>
			<div> 2fa status : {user?.is2FAOn ? "true" : "false"} </div>
		</div>
	);
}

export default TwoFAStatus;
