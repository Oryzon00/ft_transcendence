import { useEffect, useState } from "react";
import { User } from "./TuseUser";
import apiAddress from "../apiAddress";
import getJwtTokenFromCookie from "../getJWT";

async function getUserAPI(): Promise<User> {
	const url = apiAddress + "/user/me";
	const user = fetch(url, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie()
		}
	})
		.then(function (response) {
			if (!response.ok) {
				throw new Error(
					"Request failed with status " + response.status
				);
			}
			return response.json();
		})
		.then(function (data) {
			return data;
		})
		.catch(function (error) {
			//handle error
			console.log(error);
		});
	return user;
}

function useUser() {
	const [user, setUser] = useState< User | undefined>();
	async function fetchUser() {
		const user: User = await getUserAPI();
		setUser(user);
	}
	useEffect(function () {
		fetchUser();
	}, []);

	return user;
}

export default useUser;
