import { createContext } from "react";
import { User } from "../hooks/TuseUser";

const defaultUser: User | undefined = {
	id: 0,
	name: "default",
	image: "default",
	is2FAOn: false,
	createdAt: "default",
	updatedAt: "default"
};
const UserContext = createContext<User | undefined>(defaultUser);

export default UserContext;
