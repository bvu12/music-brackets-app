import { Server, Socket } from "socket.io";
import { customAlphabet } from "nanoid";

import { Node, Room } from "../types/types";
import {
  Player,
  PlayerToRoomDict,
  roomIdToRoomObjDict,
} from "../../shared/types";
import { roomService } from "../services/roomService";
import { startCountdownTimer } from "./timerHandler";
import { playerService } from "../services/playerService";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export function roomHandler(
  server: Server,
  socket: Socket,
  rooms: roomIdToRoomObjDict,
  activePlayers: PlayerToRoomDict
) {
  function createRoom() {
    const roomId = nanoid().toUpperCase();
    const adminId = socket.id;

    const owner = playerService.createOwner(adminId);
    const listOfPlayers =
      playerService.createOriginalPlayerListWithAdmin(owner);

    const room = roomService.createRoom(roomId, adminId, listOfPlayers);

    rooms[roomId] = room;
    activePlayers[socket.id] = {
      player: listOfPlayers.getHead()!,
      room: room,
    };

    socket.join(roomId);
    server
      .in(roomId)
      .emit(
        "create-room-msg",
        `${socket.id}: successfully created and joined '${roomId}' room `
      );
    console.log(`Successfully created and joined '${roomId}' room `);

    server.in(roomId).emit("players-in-room", room.players.traverse());

    // // Start the timer on room creation
    // startCountdownTimer(server, socket, rooms, room.duration);
    // server.sockets
    //   .in(roomService.getRoomId(socket))
    //   .emit("is-timer-paused", false);
  }

  /**
   * Join a room
   * @param roomId - room id
   */
  function joinRoom(roomId: string) {
    const room = roomService.getRoom(rooms, roomId);
    if (room && !room.isRunning) {
      socket.join(roomId);
      const newPlayer = roomService.addPlayerToRoom(room, socket);

      activePlayers[socket.id] = {
        player: newPlayer,
        room: room,
      };

      server.in(roomId).emit("players-in-room", room.players.traverse());
      server
        .in(socket.id)
        .emit("join-room-msg", `Successfully joined room: '${roomId}'`);
      console.log(`${socket.id}: successfully joined room: '${roomId}' `);
      // server.in(room.roomId).emit("selected_artists", room.selectedArtists); // So the user sees the updated lobby
    } else {
      server
        .in(socket.id)
        .emit(
          "join-room-err-msg",
          "Invalid join code or session is already underway."
        );
    }
  }

  function leaveRoom() {
    const playerToDelete: Node<Player> = activePlayers[socket.id]?.player;
    let room: Room = activePlayers[socket.id]?.room;

    if (room && playerToDelete) {
      room = roomService.removePlayerFromRoom(rooms, room, playerToDelete);
      delete activePlayers[socket.id];

      // If we still have players in the room
      if (room) {
        server.in(room.roomId).emit("players-in-room", room.players.traverse());
      }
    }
  }

  socket.on("create_room", createRoom);
  socket.on("join_room", joinRoom);
  socket.on("disconnect", leaveRoom);
}
