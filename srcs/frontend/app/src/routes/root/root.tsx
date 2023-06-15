import {api42_adress} from "./api42_adress.ts";

function isEmptyString(str: string) {
    return str === null || str === undefined || str.trim().length === 0;
}

function Root() {
    if (isEmptyString(document.cookie)) //to modify and check jwt
        self.location.href = api42_adress;
    else
        self.location.href = "http://localhost:8000/home"
    return (
        <>
            <div>Animation de chargement qui pedale // hamstere de roue</div>
        </>
    );
}

export default Root;
