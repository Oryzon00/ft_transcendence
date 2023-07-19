import { useState } from "react";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";

function CreationChannelLayout() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('public');

    const options = [
        {
            label: "public",
            value: "public"
        },
        {
            label: "private",
            value: "private",
        },
        {
            label: "protect",
            value: "protect"
        }
    ]

    function createChannel() {
        const url = apiAddress + '/chat/channel/create';
        fetch(url, {
            method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json",
			},
            body: JSON.stringify({
                name: name,
                status: status,
                password: password,
            })
        }
        ).then(
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
                console.log(data)
            }
        )
    }

    return (
            <div id="create-channel">
                <div id="channel-name">
                    <h2>
                        Nom Channel
                    </h2>
                    <input type="text" value={name} placeholder="Entrer un nom" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div id="channel-status">
                    <h2>
                        Status
                    </h2>
                    <select name="status" id="status-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div id="channel-password">
                    <h2>
                        Mot de passe
                    </h2>
                    <input type="text" value={password} placeholder="Entrer mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button onClick={createChannel} id="create-channel-button">
                    Create Channel
                </button>
            </div>
    );

}

export default CreationChannelLayout;