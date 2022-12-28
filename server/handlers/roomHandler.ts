import { Server, Socket } from "socket.io";
import { customAlphabet } from "nanoid";

import { Room } from "../types/types";
import { Player, PlayerToRoomDict } from "../../shared/types";
import { roomService } from "../services/roomService";
import { startCountdownTimer } from "./timerHandler";

const TIMER_DEFAULT_SECONDS = 10;
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export function roomHandler(
  server: Server,
  socket: Socket,
  rooms: Room[],
  activePlayers: PlayerToRoomDict
) {
  function createRoom() {
    const roomId = nanoid().toUpperCase();
    const owner: Player = {
      playerSocketId: socket.id,
      username: "Player 1",
      isRoomOwner: true,
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
      selectedArtists: [],
    };

    rooms.push(room);

    // So we can easily remove players from a room - basically a BiDict... not sure if this is the best implementation
    activePlayers[socket.id] = {
      player: owner,
      room: room,
    };

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
      const newPlayer = roomService.addPlayerToRoom(rooms, socket);

      if (newPlayer) {
        activePlayers[socket.id] = {
          player: newPlayer,
          room: room,
        };

        server.in(roomId).emit("players-in-room", room.players);
        server
          .in(socket.id)
          .emit("join-room-msg", `Successfully joined room: '${roomId}'`);
        console.log(`${socket.id}: successfully joined room: '${roomId}' `);
        server.in(room.roomId).emit("selected_artists", room.selectedArtists); // So the user sees the updated lobby
      }
    } else {
      server.in(socket.id).emit("join-room-err-msg", "Invalid join code!");
    }
  }

  function leaveRoom() {
    const player: Player = activePlayers[socket.id]?.player;
    const room: Room = activePlayers[socket.id]?.room;
    roomService.removePlayerFromRoom(room, player);

    server.in(room.roomId).emit("players-in-room", room.players);
    delete activePlayers[socket.id];
  }

  socket.on("create_room", createRoom);
  socket.on("join_room", joinRoom);
  socket.on("disconnect", leaveRoom);
}
