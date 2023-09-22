import { Friends} from "../../../layouts/ChatLayout/chat.d";

type ContentType = {
    friends: Friends[];
    togglemodal: any;
}

function Content({ friends, togglemodal } : ContentType) {
    console.log(friends)
    return (<></>)
    /*
    return (
        <div>

            {friends.map((friend) => (
                    <div>
                        <img src={friend.image} className="h-12 w-12 rounded-full mb-2 cursor-pointer"/>
                        <p>{friend.name}</p>
                    </div>
                ))}
        </div>
    );
    */
}

export default Content;