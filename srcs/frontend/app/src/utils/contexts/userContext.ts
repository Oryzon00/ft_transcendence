import { createContext } from "react";
import { User } from "../hooks/TuseUser";
import { UserHook } from "../hooks/TuseUser";

// const defaultUser: User  = {
// 	id: 0,
// 	name: "default",
// 	image: "default",
// 	is2FAOn: false,
// 	createdAt: "default",
// 	updatedAt: "default"
// };

// // const UserContext = createContext<User | undefined>(defaultUser);
// function defaultSetUser() {}
// defaultSetUser: React.Dispatch<React.SetStateAction<User>> = function (user : User) {

// }

// const defaultHook : UserHook = {
// 	user: defaultUser,
// 	setUser: defaultSetUser
// }

const UserContext = createContext<UserHook>({} as UserHook);

export default UserContext;
