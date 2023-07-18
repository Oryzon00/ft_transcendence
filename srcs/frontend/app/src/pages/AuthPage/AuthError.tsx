import { useRouteError } from "react-router-dom";

function AuthError() {
	// A changer juste webstorm qui clc, hint : (useUnknownInCatchVariables: true)
	const error: any = useRouteError();

	return (
		<>
			<div>Auth Error</div>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<form action="http://localhost:8000">
				<input type="submit" value="Try Again !" />
			</form>
		</>
	);
}

export default AuthError;
