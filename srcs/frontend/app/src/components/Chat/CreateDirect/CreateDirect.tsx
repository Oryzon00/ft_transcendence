import { useEffect, useState } from "react";
import Header from "./Header";
import { Friends} from "../../../layouts/ChatLayout/chat.d";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";
import Content from "./Content"
import useUser from "../../../utils/hooks/useUser";
import { UserHook } from "../../../utils/hooks/TuseUser";

type CreateDirectType = {
    togglemodal: any;
}
function CreateDirect({togglemodal} : CreateDirectType) {
	const user: UserHook = useUser();
	let friends : Friends[] = [
					{
						id: user.user.id,
						name: user.user.name,
						image: user.user.image
					}
	];

    const listFriends = () => {
		fetch(apiAddress + "/user/friends/get", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie()
			}
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (data : Friends[]): void {
				console.log('salut')
				if (data.length > 0 && data[0].id != undefined)
				{
					friends = (data);
				}
			})
			.catch(function (error) {
				notifyError(error.message);
			});
    }

    useEffect(() => {
        listFriends();
    }, [])

    return (
		<div
			className="flex flex-col bg-zinc-700 border-4 w-[440px] h-[550px] relative rounded"
		>
            <Header />
            <Content friends={friends} togglemodal={togglemodal} />
        </div>
    );
}

export default CreateDirect;