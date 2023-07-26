import { useEffect, useState } from "react";
import { ChannelPayload, MessagePayload } from "../../layouts/ChatLayout/chat.d";
import { UserHook } from "../../utils/hooks/TuseUser";
import MessageBox from "./Discussion/MessageBox";
import ChooseBox from "./Discussion/ChooseBox";

type CurrentChannel = {
	channel: {[key: string]: ChannelPayload},
	current: string,
    me: UserHook,
}

function DiscussionBoard({channel, current, me} : CurrentChannel)
{
    const [value, setValue] = useState(0);

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
                    <button>
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