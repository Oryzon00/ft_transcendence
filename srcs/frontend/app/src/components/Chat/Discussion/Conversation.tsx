import { MessagePayload } from "../../../layouts/ChatLayout/chat.d";
import { UserHook } from "../../../utils/hooks/TuseUser";

type ConversationType = {
    message: MessagePayload[];
    me : UserHook;
}

function Conversation({message, me} : ConversationType) {
    return (
        <>
       {message.map(e => (
            <div>
                {e.authorId}
                {e.content}
            </div>
        ))} 
        </>
    )
}

export default Conversation;