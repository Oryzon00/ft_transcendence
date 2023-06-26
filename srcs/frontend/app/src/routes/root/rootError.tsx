import { useRouteError } from "react-router-dom";

function RootError() {
    const error:any = useRouteError(); // A changer juste webstorm qui clc, hint : (useUnknownInCatchVariables: true)

    return (
        <>
            <div>Error :</div>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </>
    );
}

export default RootError;