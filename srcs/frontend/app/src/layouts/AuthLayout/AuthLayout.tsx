import { useLoaderData } from "react-router";
import Modal2FA from "../../components/Auth/Modal2FA.tsx";
function AuthLayout () {
	const user: any = useLoaderData();

	if (user) {
		return <Modal2FA user={user} />;
	} else {
		return <div>Auth loading</div>;
	}
}

export default AuthLayout;