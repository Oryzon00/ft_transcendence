import { useState } from "react";

type InputRoomNameType = {
    result: string;
    setResult: any;
};

function InputRoomName({result, setResult}: InputRoomNameType) {
    return (
        <div id="name" className="flex flex-col">
            <h3 className="text-[#566573] text-xl text-left w-11/12 mx-auto mb-2">
                Room name
            </h3>
            <input
                type="text"
                className="bg-[#eaecee] w-11/12 h-8 rounded-sm text-black outline-none mx-auto"
                value={result}
                onChange={(e) => setResult(e.target.value)}
            />
        </div>
    );

}

export default InputRoomName;