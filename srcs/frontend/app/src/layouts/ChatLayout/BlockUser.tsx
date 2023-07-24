import { useEffect, useState } from "react";

function BlockUser({show, hide}) {
    const [value, setValue] = useState('');

    //function getBlock()
    if (!show) return (null)
    return (
        <div>
            <button onClick={hide}>CLOSE</button>
            <h2>Block user:</h2>
            <input type="text" />
            <h2>Unblock user:</h2>
            <ul>
                <li></li>
            </ul>
        </div>
    );
}

export default BlockUser;