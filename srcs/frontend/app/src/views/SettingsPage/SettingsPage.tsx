import SettingsLayout from "../../layouts/SettingsLayout/SettingsLayout";
import UserContext from "../../utils/contexts/userContext";
import useUser from "../../utils/hooks/useUser";

function SettingsPage() {

const userHook = useUser();

	return (
		<UserContext.Provider value={userHook}>
			<SettingsLayout />
		</UserContext.Provider>
	);
}

export default SettingsPage;
