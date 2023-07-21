import { ChannelPayload, MessagePayload } from "../../layouts/ChatLayout/chat.d";
import { UserHook } from "../../utils/hooks/TuseUser";
import "../../layouts/ChatLayout/chat.css"

type CurrentChannel = {
	channel: {[key: string]: ChannelPayload},
	current: string,
    me: UserHook,
}

function DiscussionBoard({channel, current, me} : CurrentChannel)
{
	if (current == '')
		return (<div className="no-channel"><p>No channel</p></div>);
	console.log(channel);
	return ( 
		<div id="discussion">
            <div id="message-box">
            {
                channel[current].messagesId.map((msg : MessagePayload) => { 
                    if (me.user.id == msg.authorId)
                        return ( <div><p className="me">{msg.authorId} {msg.content}</p></div>)
                    else
                        return ( <div><p className="other">{msg.authorId} {msg.content}</p></div>)
                }
                )
            }
            </div>
        </div>
	);
}

export default DiscussionBoard;