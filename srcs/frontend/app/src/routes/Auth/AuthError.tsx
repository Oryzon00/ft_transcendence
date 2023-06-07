import { useRouteError } from "react-router-dom";

function AuthError () {
    const error:any = useRouteError(); // A changer juste webstorm qui clc, hint : (useUnknownInCatchVariables: true)

    return(
        <>
            <div>Auth Error :'(</div>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </>
    );
}

export default AuthError;