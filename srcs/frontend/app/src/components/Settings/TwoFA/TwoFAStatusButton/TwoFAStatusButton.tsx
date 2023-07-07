import useUser from "../../../../utils/hooks/useUser";

function TwoFAStatusButton() {
	const user = useUser();
	console.log(user);
	console.log(user?.is2FAOn)
	return (
		<div>
			<div> 2fa status : {user?.is2FAOn} </div>
		</div>
	);
}

export default TwoFAStatusButton;
