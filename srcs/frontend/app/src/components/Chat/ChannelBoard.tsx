import { useState } from "react"
import { ChannelId,  ChannelPayload,  ListChannel } from "../../layouts/ChatLayout/chat.d";

function searchElements(channels: ListChannel, query : string) : ChannelId[] 
{
    let res : ChannelId[] = [];

    for (let key in channels)
    {
        let name : string = channels[key].name;
        if (query == '' || name.startsWith(query))
            res.push({id: channels[key].id, name: channels[key].name});
    }
    return (res);
}

type TypeChannelBoard = {
	channels: {[key: string]: ChannelPayload};
    setCurrent: any;
}

export default function ChannelBoard({channels, setCurrent} : TypeChannelBoard) {
    const [query, setQuery]  = useState('');
    const filtredItems : ChannelId[] = searchElements(channels, query);

    function changeCurrent(id: string) {
        setCurrent(id);
        setQuery('')
    }

    return (
        <div className="rounded w-full scrollbar">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
            <ul>
                {
                    filtredItems.map((value) => (
                        <li>
                            <button id={value.id} onClick={() => {changeCurrent(value.id)}}>{value.name}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}