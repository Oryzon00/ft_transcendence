import { authProtection } from "../cookieProtection.ts";
import { useLoaderData } from "react-router-dom";

let testBool = false
export async function authLoader() {
    const params = new URLSearchParams(window.location.search);
    if (params !== null && testBool === false ) {
        testBool = true;
        const url = "http://localhost:3000/auth?" + (params).toString();

        const res = await fetch(url);
        if (!res.ok)
            throw new Response("Auth Error", { status: 401 });
        else {
            await res.json()
                .then((token) => {
                    console.log(`token = ${token}`);
                    document.cookie = `JWT=${token.access_token};path=/`;
                    console.log(document.cookie);
                })
        }
    }
    return (null)
}
function Auth() {
    authProtection();
    const test:any = useLoaderData();

    console.log(test);
    return (
        <>
            <div>Loading</div>
        </>
    );
}

export default Auth;