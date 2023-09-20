import { useEffect, useState } from "react";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { ChannelInfo } from "../../../layouts/ChatLayout/chat.d";

// Old version community toggle
// Need the function getSearch but can redo the interface completely

function SearchChannelLayout({open, onClose, newChannel}) {
    const [value, setValue] = useState('')
    const [channel, setChannel] = useState<ChannelInfo[]>([])
    const url = apiAddress + '/chat/channel/search'

    useEffect(() => {
        getSearch()
        console.log('channel: ', channel);
    }
    ,[channel])

    function getSearch() {
        fetch(url, {
            method: "POST",
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
    if (!open) return null;
    return (
        <div>
            <button onClick={onClose}>CLOSE</button>
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