import { useState } from "react";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import NameInput from "../../components/Chat/CreateChannel/NameInput";
import PasswordInput from "../../components/Chat/CreateChannel/PasswordInput";
import SelectStatus from "../../components/Chat/CreateChannel/SelectStatus";

function CreationChannelLayout({open, onClose, newChannel}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('public');

    if (!open) return null;

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
                newChannel({id: data.id, name: data.name, status: data.status, message: []});
            }
        )
    }

    return (
            <div id="create-channel">
                <button onClick={onClose}>CLOSE</button>
                <NameInput name={name} setName={setName}/>
                <SelectStatus options={options} setStatus={setStatus}/>
                <PasswordInput password={password} setPassword={setPassword}/>
                <button onClick={createChannel} id="create-channel-button">
                    Create Channel
                </button>
            </div>
    );

}

export default CreationChannelLayout;