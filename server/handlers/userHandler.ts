import { Server, Socket } from "socket.io";

import { Room } from "../types/types";
import { roomService } from "../services/roomService";

export function userHandler(server: Server, socket: Socket, rooms: Room[]) {
  // User stuff
  function renameUser(username: string) {
    const room = roomService.findRoomBySocket(rooms, socket);
    if (room) {
      roomService.editPlayerUsername(rooms, socket, socket.id, username);
      server.in(room.roomId).emit("players-in-room", room.players);
    }
  }

  socket.on("set_username", renameUser);
}
