import SettingsLayout from "../../layouts/SettingsLayout/SettingsLayout";
import { UserProvider } from "../../utils/contexts/userContext";

function SettingsPage() {
	return (
		<UserProvider>
			<SettingsLayout />
		</UserProvider>
	);
}

export default SettingsPage;
