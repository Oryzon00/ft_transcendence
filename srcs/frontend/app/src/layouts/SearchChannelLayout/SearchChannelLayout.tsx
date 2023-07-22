import { useEffect, useState } from "react";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { ChannelInfo } from "../ChatLayout/chat.d";

function SearchChannelLayout() {
    const [value, setValue] = useState('')
    const [channel, setChannel] = useState<ChannelInfo[]>([])
    const url = apiAddress + '/chat/channel/search'

    useEffect(() =>
        getSearch()
    ,[channel])

    function getSearch() {
        fetch(url, {
            method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json",
			},
            body: JSON.stringify({
                value: value
            })
        })
            .then(
			function (res: Response) {
				if (!res.ok) {
					throw new Error(
						"Request failed with status " + res.status
					);
				}
				return (res.json());
			})
            .then(
                function(data) {
                    setChannel(data);
                }
            )
    }
    return (
        <div>
            <h2>search channel</h2>
            <input type="text" value={value}onChange={(e) => setValue(e.target.value)}/>
            {
                channel.map((e: ChannelInfo) => (
                    <li>
                        <button>{e.id} {e.name} {e.status}</button>
                    </li>
                ))
            }
        </div>
    )
}

export default SearchChannelLayout;