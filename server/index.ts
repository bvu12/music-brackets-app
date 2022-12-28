// SOURCE: https://github.com/arch-inc/nextjs-socketio-chat-example
// https://stackblitz.com/edit/github-oqhe9b?file=server%2Findex.ts,pages%2Findex.tsx
import next from "next";

import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { Room } from "./types/types";
import { lobbyHandler } from "./handlers/lobbyHandler";
import { roomHandler } from "./handlers/roomHandler";
import { timerHandler } from "./handlers/timerHandler";
import { userHandler } from "./handlers/userHandler";
import { PlayerToRoomDict } from "../shared/types";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

var rooms: Room[] = [];
var activePlayers: PlayerToRoomDict = {};
app
  .prepare()
  .then(async () => {
    // create http server
    const httpServer = createServer((req, res) => handle(req, res));

    // create Socket.io server
    const socketServer = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });

    // const requestHandler = createRequestHandler(socketServer);
    const socketHandler = (socket: Socket) => {
      lobbyHandler(socketServer, socket, rooms);
      roomHandler(socketServer, socket, rooms, activePlayers);
      timerHandler(socketServer, socket, rooms);
      userHandler(socketServer, socket, rooms);
    };
    socketServer.on("connection", socketHandler);

    // start listening
    httpServer.listen(port, () => {
      console.log(
        `> Server listening at http://localhost:${port} as ${
          dev ? "development" : process.env.NODE_ENV
        }`
      );
    });
  })
  .catch((err) => {
    console.error("Next.js server failed to start", err);
  });
