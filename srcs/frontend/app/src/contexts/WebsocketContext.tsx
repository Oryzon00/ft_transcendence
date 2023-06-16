import { createContext } from "react";
import { io, Socket } from "socket.io-client"

export const socket = io("http://paul-f4Br4s5:3000");
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
