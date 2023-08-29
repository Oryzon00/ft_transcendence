import { useEffect, useState } from "react";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";

function BlockUser({show, hide}) {
    const [query, setQuery] = useState('');
    const [block, setBlock] = useState([])

    const getBlock = () => {
        fetch(apiAddress + '/chat/isBlocked', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getJwtTokenFromCookie(),
            },
        })
        .then(
            function (res: Response) {
                if (!res.ok) {
                    throw new Error(
                        "Request failed with status " + res.status
                    );
                }
                return (res.json());
            }
        )
        .then(
            function (data) {
                setBlock(data)
            }
        )
        .catch(
            function(error) {
                notifyError(error.message)
            }
        )
    }
    

    const blockuser = () => {
        fetch(apiAddress + "/chat/user/block", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getJwtTokenFromCookie(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: query
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
            }
        )
        .then(function () {})
        .catch(
            function(error) {
                notifyError(error.message)
            }
        )
    }
    const unblockuser = (name : string) => {
        fetch(apiAddress + "/chat/user/unblock", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getJwtTokenFromCookie(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name
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
            }
        )
        .then(function () {})
        .catch(
            function(error) {
                notifyError(error.message)
            }
        )
    }
    if (!show) return (null)
    return (
        <div>
            <button onClick={hide}>CLOSE</button>
            <h2>Block user:</h2>
            <div >
                <input type="text" />
                <button onClick={blockuser}>
                    Block
                </button>
            </div>
            <h2>Unblock user:</h2>
            <ul>
                {
                    block.map(
                        (value) => (
                        <li>
                            <button onClick={() => unblockuser(value)}>
                                {value}
                            </button>
                        </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}

export default BlockUser;