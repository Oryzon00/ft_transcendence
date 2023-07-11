import SettingsLayout from "../../layouts/SettingsLayout/SettingsLayout";
import UserProvider from "../../utils/contexts/userContext";
import UserContext from "../../utils/contexts/userContext";
import useUser from "../../utils/hooks/useUser";

function SettingsPage() {
	const userHook = useUser();

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
