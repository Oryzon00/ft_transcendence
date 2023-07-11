import { createContext, ReactNode } from "react";
import { UserHook } from "../hooks/TuseUser";
import useUser from "../hooks/useUser";

const UserContext = createContext<UserHook>({} as UserHook);

const UserProvider: React.FC<React.ReactNode> = function (children) {
	const userHook = useUser();
	return (
		<UserContext.Provider value={userHook}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
