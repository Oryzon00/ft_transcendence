import { useEffect, useState } from "react";
import SelectStatus from "../CreateChannel/SelectStatus";

// fetch info to the back for the new config
function ChannelSettings({}) {
    const [status, setStatus] = useState('public');
    const [password, setPassword] = useState('');

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

    return (
        <div>
            <h1>Channel Setting Page</h1>
            <div>
                <h2>Change Status</h2>
                <SelectStatus options={options} status={status} setStatus={setStatus}/>
            </div>
            <div>
                <h2>Change Password</h2>
                <input type="text" />
            </div>
            <button>Save</button>
        </div>
    );
}

export default ChannelSettings;