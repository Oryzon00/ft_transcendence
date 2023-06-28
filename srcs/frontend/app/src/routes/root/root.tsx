import {api42_adress} from "./api42_adress.ts";
import { getJwtTokenFromCookie } from '../cookieProtection';
import "./root.styles.css"


function Root() {
    function goTo() {
        self.location.href = api42_adress;
    }

    if (getJwtTokenFromCookie()) //to modify and check jwt
        self.location.href = "http://localhost:8000/home"    
    return (
        <div className="connect-root">
            <div>Animation de chargement qui pedale // hamstere de roue</div>
            <button onClick={goTo}>Connect 42</button>
        </div>
    );
}

export default Root;
