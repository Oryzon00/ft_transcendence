import { createContext } from "react";
import { UserHook } from "../hooks/TuseUser";

const UserContext = createContext<UserHook>({} as UserHook);

export default UserContext;
