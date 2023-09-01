import Header from "../Header";
import Input from "./Input";
import Bottom from './Bottom';

type PasswordType = {
    setPosition: any;
    setPassword: any;
    password: string;
}

function Password({setPosition, setPassword, password}: PasswordType) {

    return (
        <div className="h-full w-full rounded-sm">
            <Header title="Password" description="Put a password on your room to protect."/>
            <Input password={password} setPassword={setPassword}/>
            <Bottom setPosition={setPosition} password={password}/>
        </div>
    );
}

export default Password;