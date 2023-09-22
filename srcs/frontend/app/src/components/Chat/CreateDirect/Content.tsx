import { Friends } from "../../../layouts/ChatLayout/chat.d";

type ContentType = {
    friends: Friends[];
    togglemodal: any;
}

function Content({ friends, togglemodal } : ContentType) {
    return (
        <div className="bg-[#27272a] h-[70%] w-[90%] overflow-y-scroll gap-x-2 m-auto">

            {friends.map((friend) => (
                    <div className="flex flex-row items-center gap-x-3 border-2 cursor-pointer" onClick={() => {togglemodal()}}>
                        <img src={friend.image} className="h-12 w-12 rounded-full mb-2 cursor-pointer"/>
                        <p className="text-3xl font-bold text-center w-full">{friend.name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Content;