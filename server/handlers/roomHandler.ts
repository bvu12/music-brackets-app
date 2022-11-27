import { Server, Socket } from "socket.io";
import { customAlphabet } from "nanoid";

import { Room } from "../types/types";
import { Player } from "../../shared/types";
import { roomService } from "../services/roomService";
import { startCountdownTimer } from "./timerHandler";

const TIMER_DEFAULT_SECONDS = 10;
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export function roomHandler(server: Server, socket: Socket, rooms: Room[]) {
  function createRoom() {
    const roomId = nanoid().toUpperCase();
    const owner: Player = {
      playerSocketId: socket.id,
      username: "Player 1",
    };

    socket.join(roomId);
    server
      .in(roomId)
      .emit(
        "create-room-msg",
        `${socket.id}: successfully created and joined '${roomId}' room `
      );
    console.log(`Successfully created and joined '${roomId}' room `);

    const room: Room = {
      roomId: roomId,
      duration: TIMER_DEFAULT_SECONDS,
      timerId: undefined,
      currentTime: 0,
      isRunning: false,
      players: [owner],
    };

    rooms.push(room);

    server.in(roomId).emit("players-in-room", room.players);

    // Start the timer on room creation
    startCountdownTimer(server, socket, rooms, room.duration);
    server.sockets
      .in(roomService.getRoomId(socket))
      .emit("is-timer-paused", false);
  }

  /**
   * Join a room
   * @param roomId - room id
   */
  function joinRoom(roomId: string) {
    const room = roomService.findRoomByRoomId(rooms, roomId);
    if (room) {
      socket.join(roomId);
      roomService.addPlayerToRoom(rooms, socket);

      server.in(roomId).emit("players-in-room", room.players);
      server
        .in(socket.id)
        .emit("join-room-msg", `Successfully joined room: '${roomId}'`);
      console.log(`${socket.id}: successfully joined room: '${roomId}' `);
    } else {
      server.in(socket.id).emit("join-room-err-msg", "Invalid join code!");
    }
  }

  socket.on("create_room", createRoom);
  socket.on("join_room", joinRoom);
}