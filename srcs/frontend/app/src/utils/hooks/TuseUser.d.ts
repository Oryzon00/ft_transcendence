export type User = {
	id: number;
	name: string;
	image: string;
	is2FAOn: boolean;
	createdAt: string;
	updatedAt: string;
	rank: number;
};

export type UserHook = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
};
