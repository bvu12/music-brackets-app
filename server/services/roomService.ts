import { Room } from "../types/types";
import { Player, SearchForArtistItem } from "../../shared/types";
import { Socket } from "socket.io";

export module roomService {
  export function getRoomId(socket: Socket): string {
    return Array.from(socket.rooms).slice(-1)[0];
  }

  export function findRoomByRoomId(
    rooms: Room[],
    givenRoomId: string
  ): Room | null {
    for (let room of rooms) {
      var roomId = room.roomId;
      if (roomId === givenRoomId) {
        return room;
      }
    }

    return null;
  }

  export function findRoomBySocket(rooms: Room[], socket: Socket): Room | null {
    const roomId: string = getRoomId(socket);

    return findRoomByRoomId(rooms, roomId);
  }

  export function removeRoomBySocket(rooms: Room[], socket: Socket): Room[] {
    const roomId: string = getRoomId(socket);

    return rooms.filter((room) => room.roomId !== roomId);
  }

  export function addPlayerToRoom(rooms: Room[], socket: Socket) {
    var players = _getPlayersInRoom(rooms, socket);

    if (players) {
      const newPlayer: Player = {
        playerSocketId: socket.id,
        username: _getNextUsername(players),
        isRoomOwner: false,
      };

      players.push(newPlayer);

      return newPlayer;
    }
  }

  export function removePlayerFromRoom(room: Room, player: Player) {
    let players = room.players;

    const index = players.indexOf(player);
    if (index > -1) {
      players.splice(index, 1);
    }
    players = _setNewRoomOwner(players);
    // TODO: Remove room from rooms if there are no more players
    return players;
  }

  export function editPlayerUsername(
    rooms: Room[],
    socket: Socket,
    socketId: string,
    desiredUsername: string
  ) {
    var players = _getPlayersInRoom(rooms, socket);
    if (players) {
      for (let player of players) {
        var playerId = player.playerSocketId;
        if (playerId === socketId) {
          player.username = desiredUsername;
        }
      }
    }
  }

  export function addArtistToRoom(
    rooms: Room[],
    socket: Socket,
    artist: SearchForArtistItem
  ) {
    const room = roomService.findRoomBySocket(rooms, socket);
    const selectedArtists = room?.selectedArtists;

    // Only add if not already in the list
    if (
      selectedArtists &&
      !selectedArtists.some(
        (alreadySelected) => alreadySelected.id === artist.id
      )
    ) {
      room.selectedArtists = [...selectedArtists, artist];
    }
  }

  export function removeArtistFromRoom(
    rooms: Room[],
    socket: Socket,
    artist: SearchForArtistItem
  ) {
    const room = roomService.findRoomBySocket(rooms, socket);
    const selectedArtists = room?.selectedArtists;

    if (selectedArtists) {
      room.selectedArtists = selectedArtists.filter((alreadySelected) => {
        return alreadySelected.id !== artist.id;
      });
    }
  }
}

function _getPlayersInRoom(rooms: Room[], socket: Socket) {
  const room = roomService.findRoomBySocket(rooms, socket);
  var players = room?.players;
  return players;
}

function _getNextUsername(players: Player[]): string {
  const len = players.length;
  return "Player " + (len + 1).toString();
}

function _setNewRoomOwner(players: Player[]): Player[] {
  // Post-delete, owner is set based on join time
  if (players.length > 0) {
    players[0].isRoomOwner = true;
  }

  return players;
}
