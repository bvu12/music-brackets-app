import { Server, Socket } from "socket.io";

import { Room } from "../types/types";
import { roomService } from "../services/roomService";
import { SearchForArtistItem } from "../../shared/types";

export function lobbyHandler(server: Server, socket: Socket, rooms: Room[]) {
  // Lobby stuff
  function addSelectedArtist(artist: SearchForArtistItem) {
    const room = roomService.findRoomBySocket(rooms, socket);
    if (room) {
      roomService.addArtistToRoom(rooms, socket, artist);
      server.in(room.roomId).emit("selected_artists", room.selectedArtists);
    }
  }

  function removeSelectedArtist(artist: SearchForArtistItem) {
    const room = roomService.findRoomBySocket(rooms, socket);
    if (room) {
      roomService.removeArtistFromRoom(rooms, socket, artist);
      server.in(room.roomId).emit("selected_artists", room.selectedArtists);
    }
  }

  socket.on("add_selected_artist", addSelectedArtist);
  socket.on("remove_selected_artist", removeSelectedArtist);
}
