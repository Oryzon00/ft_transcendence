import { useState } from "react";

function SettingsBox({current, setValue}) {
    const [password, setPassword] = useState('');
    return (
        <div>
            <button onClick={() => setValue(0)}>
                return
            </button>
            <div>
                <h2>Status</h2>
            </div>
            <div>
                <h2>Password</h2>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button>
                Save
            </button>
        </div>
    )

}

export default SettingsBox;