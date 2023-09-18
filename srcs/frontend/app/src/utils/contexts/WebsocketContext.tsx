import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import getJwtTokenFromCookie from "../getJWT";

const socketOptions = {
	path: "/chatSocket",
    transportOptions: {
        polling: {
            extraHeaders: {
				Authorization: "Bearer " + getJwtTokenFromCookie()
            }
        }
    }
}
export const socket = io(`http://${window.location.hostname}:3000`, socketOptions);
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
