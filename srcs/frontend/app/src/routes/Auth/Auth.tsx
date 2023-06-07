import { authProtection } from "../cookieProtection.ts";

let testBool = false
function Auth() {
    authProtection();

    const params = new URLSearchParams(window.location.search);
    if (params !== null && testBool === false ) {
        testBool = true;
        const url = "http://localhost:3000/auth?" + (params).toString();
        fetch(url, {
            method: "GET"
        })
            .then((response) => {
                return (response.json());
            })
            .then((user) => {
                console.log(user.name);
                document.cookie = `name=${user.name};path=/`;
                console.log(document.cookie);
                self.location.href = "http://localhost:8000";
            })
    }
    return (
        <>
            <div>Loading</div>
        </>
    );
}

export default Auth;