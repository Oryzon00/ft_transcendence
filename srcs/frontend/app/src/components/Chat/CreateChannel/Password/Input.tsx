type InputType = {
    password: string;
    setPassword: any;
};

function Input({password, setPassword} : InputType) {
    return (
        <div className="flex flex-col">
            <h3 className="text-[#566573] text-xl text-left w-11/12 mx-auto mb-2">New Password</h3>
            <input
                type="text"
                className="bg-[#eaecee] w-11/12 h-8 rounded-sm text-black outline-none mx-auto"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            />
        </div>
    );
}

export default Input;