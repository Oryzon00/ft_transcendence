import { useRouteError } from "react-router-dom";

function AuthError () {
    const error:any = useRouteError(); // A changer juste webstorm qui clc, hint : (useUnknownInCatchVariables: true)

    return(
        <>
<<<<<<< HEAD:srcs/frontend/app/src/routes/root/rootError.tsx
            <div>Error :</div>
=======
            <div>Auth Error</div>
>>>>>>> origin/main:srcs/frontend/app/src/views/AuthPage/AuthError.tsx
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