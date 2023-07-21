import { useState } from "react";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";

function SearchChannelLayout() {
    const [value, setValue] = useState('')
    const [channel, setChannel] = useState()

    function getSearch() {
        const url = apiAddress + '/chat/channel/search'
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
        <>
            <h2>search channel</h2>
            <input type="text" value={value}onChange={(e) => setValue(e.target.value)}/>
        </>
    )
}

export default SearchChannelLayout;