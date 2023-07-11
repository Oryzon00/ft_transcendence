import { createContext } from "react";
import { UserHook } from "../../hooks/TuseUser";
import useUser from "../../hooks/useUser";
import { PropsWithChildren } from "react";

export const UserContext = createContext<UserHook>({} as UserHook);

// interface UserProviderProps {
// 	children: React.ReactNode;
// }

export const UserProvider: React.FC<PropsWithChildren<unknown>> = function ({
	children
}) {
	const userHook = useUser();
	return (
		<UserContext.Provider value={userHook}>{children}</UserContext.Provider>
	);
};
