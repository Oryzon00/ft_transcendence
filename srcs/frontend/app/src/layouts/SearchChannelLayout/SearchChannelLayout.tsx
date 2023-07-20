import { useState } from "react";

function SearchChannelLayout() {
    const [value, setValue] = useState('')
    return (
        <>
            <h2>search channel</h2>
            <input type="text" value={value}/>
        </>
    )
}

export default SearchChannelLayout;