import useUser from "../../../../utils/hooks/useUser";

function TwoFAStatus() {
	const user = useUser();
	return (
		<div>
			<div> 2fa status : {user?.is2FAOn ? "true" : "false"} </div>
		</div>
	);
}

export default TwoFAStatus;
