import { useState } from "react";
import "./Home.styles.css";
import { db_adress } from "../../db_adress";
import { cookieProtection } from "../cookieProtection.ts";
function Home() {
    cookieProtection();

    const [count, setCount] = useState(0);
    const [users, setUsers] = useState("");

    function callBack(event: any) {
        event.preventDefault();
        // fetch est non bloquant --> besoin de then
        fetch(db_adress + "/users", {
            method: "GET"
        })
            .then((response) => {
                //Transforme le contenu de la reponse en JSON
                return response.json();
            })
            .then((data) => {
                setUsers(data[0].name);
            });
    }

    return (
        <>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    truc {count}
                </button>
            </div>
            <button onClick={callBack}>Call back</button>
            <div>First user is {users}</div>
            <div>Welcome home {decodeURIComponent(document.cookie).split("=")[1]}</div>
        </>
    );
}

export default Home;