import { useLoaderData } from "react-router";
import Modal2FA from "../../components/Auth/Modal2FA.tsx";
import { User } from "../../utils/hooks/TuseUser";
function AuthLayout () {
	const user: unknown = useLoaderData();

	if (user) {
		return <Modal2FA user={user as User} />;
	} else {
		return <div>Auth loading</div>;
	}
}

export default AuthLayout;
