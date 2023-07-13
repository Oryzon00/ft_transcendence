import { useRouteError } from "react-router-dom";

function AuthError () {
    const error:any = useRouteError(); // A changer juste webstorm qui clc, hint : (useUnknownInCatchVariables: true)

    return(
        <>
            <div>Auth Error</div>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <form action="http://localhost:8000">
                <input type="submit" value="Try Again !" />
            </form>
        </>
    );
}

export default AuthError;