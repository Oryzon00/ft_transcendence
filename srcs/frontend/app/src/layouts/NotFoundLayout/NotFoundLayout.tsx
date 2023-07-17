import { useRouteError } from "react-router-dom";
import ButtonToLogin from "../../components/NotFound/ButtonToLogin.tsx";

function NotFoundLayout() {
	// A changer juste webstorm qui clc, hint : (useUnknownInCatchVariables: true)
	const error: any = useRouteError();

	return (
		<>
			<div>Error</div>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<ButtonToLogin />
		</>
	);
}

export default NotFoundLayout;
