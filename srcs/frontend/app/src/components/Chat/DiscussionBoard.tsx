import { useEffect, useState } from "react";
import { ChannelPayload, MessagePayload } from "../../layouts/ChatLayout/chat.d";
import { UserHook } from "../../utils/hooks/TuseUser";
import MessageBox from "./Discussion/MessageBox";
import ChooseBox from "./Discussion/ChooseBox";
import getJwtTokenFromCookie from "../../utils/getJWT";
import apiAddress from "../../utils/apiAddress";
import { getChatData } from "../../layouts/ChatLayout/ChatLayout";

type CurrentChannel = {
	channel: {[key: string]: ChannelPayload},
    setChannel: any,
	current: string,
    setCurrent: any,
    me: UserHook,
}

function DiscussionBoard({channel, setChannel, current, setCurrent, me} : CurrentChannel)
{
    const [value, setValue] = useState(0);

    const leaveChannel = () => {
        fetch(apiAddress + '/chat/channel/quit', {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + getJwtTokenFromCookie(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: current
            })
        })
        .then(
            function(res: Response) {
                if (!res.ok) {
                    throw new Error(
                        "Request failed with status " + res.status
                    );
                }
            }
        )
        .then(
            function () {
               setChannel(getChatData());
               setCurrent('');
            }
        )
    }
	if (current == '')
		return (<div className="flex justify-center items-center">
                <p>
                    No channel
                </p>
            </div>);
	return ( 
        <>
            <div className="flex space-x-0 flex-row bg-black text-4xl text-white">
                <p>
                {
                    channel[current].name
                }
                </p>
                <div>
                    <button onClick={() => setValue(1)}>
                        moderation
                    </button>
                    <button onClick={() => setValue(2)}>
                        settings
                    </button>
                    <button onClick={leaveChannel}>
                        quit
                    </button>
                </div>
            </div>
            <ChooseBox value={value} setValue={setValue} channel={channel} current={current} me={me}/>

        </>
	);
    if (value == 0) return (<MessageBox channel={channel} current={current} me={me}/>)
}

export default DiscussionBoard;