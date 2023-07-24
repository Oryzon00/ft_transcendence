import { useState } from "react";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import NameInput from "../../components/Chat/CreateChannel/NameInput";
import PasswordInput from "../../components/Chat/CreateChannel/PasswordInput";

function JoinChannelLayout({socket, open, onClose, newChannel}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    //const [status, setStatus] = useState('public');


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

    function joinChannel() {
        const url = apiAddress + '/chat/channel/join';
        fetch(url, {
            method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json",
			},
            body: JSON.stringify({
                name: name,
                password: password
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
                newChannel({id: data.id, name: data.name, status: data.status, message: []});
            }
        )
    }

    if (!open) return null;
    return (
            <div id="create-channel">
                <button onClick={onClose}>
                    CLOSE
                </button>
                <NameInput name={name} setName={setName}/>
                <PasswordInput password={password} setPassword={setPassword}/>
                <button onClick={joinChannel} id="create-channel-button">
                    Join Channel
                </button>
            </div>
    );

}

export default JoinChannelLayout;