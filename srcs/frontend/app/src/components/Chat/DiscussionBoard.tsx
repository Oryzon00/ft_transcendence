import { useEffect } from "react";
import { ChannelPayload, MessagePayload } from "../../layouts/ChatLayout/chat.d";
import { UserHook } from "../../utils/hooks/TuseUser";

type CurrentChannel = {
	channel: {[key: string]: ChannelPayload},
	current: string,
    me: UserHook,
}

function DiscussionBoard({channel, current, me} : CurrentChannel)
{
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
                <button>
                    Moderation
                </button>
                <button>
                    settings
                </button>
            </div>
            <div className="bg-white">
                <div id="message-box">
                {
                    channel[current].message.map((msg : MessagePayload) => { 
                        if (me.user.id == msg.authorId)
                            return ( <div><p className="me">{msg.authorId} {msg.content}</p></div>)
                        else
                            return ( <div><p className="other">{msg.authorId} {msg.content}</p></div>)
                    }
                    )
                }
                </div>
            </div>
        </>
	);
}

export default DiscussionBoard;