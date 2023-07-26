import { ListChannel, MessagePayload } from "../../../layouts/ChatLayout/chat.d";
import { UserHook } from "../../../utils/hooks/TuseUser";

type MessageBoxType = {
    channel : ListChannel;
    current : string;
    me : UserHook;
};

function MessageBox({channel, current, me} : MessageBoxType) {
    return (
            <div className="bg-white text-black">
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
    );

}

export default MessageBox;