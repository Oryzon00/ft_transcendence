import SettingsLayout from "../../layouts/SettingsLayout/SettingsLayout";
import UserContext from "../../utils/contexts/userContext";
import useUser from "../../utils/hooks/useUser";

function SettingsPage() {

const user = useUser();

	return (
		<UserContext.Provider value={user}>
			<SettingsLayout />
		</UserContext.Provider>
	);
}

export default SettingsPage;
