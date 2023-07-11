import User from "../../components/Home/User";
import SettingsLayout from "../../layouts/SettingsLayout/SettingsLayout";
import useUser from "../../utils/hooks/useUser";

import { UserProvider } from "../../utils/contexts/userContext";

function SettingsPage() {
	// const userHook = useUser();

	return (
		// <UserContext.Provider value={userHook}>
		// 	<SettingsLayout />
		// </UserContext.Provider>
		<UserProvider>
			<SettingsLayout />
		</UserProvider>
	);
}

export default SettingsPage;
