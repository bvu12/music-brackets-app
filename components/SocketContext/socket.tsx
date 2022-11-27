// SOURCE: https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
import React from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3000");
export const SocketContext = React.createContext(socket);
