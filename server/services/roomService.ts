import { LinkedList, Room, Node } from "../types/types";
import {
  Player,
  SearchForArtistItem,
  roomIdToRoomObjDict,
} from "../../shared/types";
import { Socket } from "socket.io";
import { playerService } from "./playerService";

const TIMER_DEFAULT_SECONDS = 10;

export module roomService {
  export function createRoom(
    roomId: string,
    adminId: string,
    listOfPlayers: LinkedList<Player>
  ): Room {
    const room = {
      roomId: roomId,
      admin: adminId,
      duration: TIMER_DEFAULT_SECONDS,
      timerId: undefined,
      currentTime: 0,
      isRunning: false,
      players: listOfPlayers,
      selectedArtists: [],
    };
    return room;
  }

  export function getRoom(
    rooms: roomIdToRoomObjDict,
    roomId: string
  ): Room | null {
    return rooms[roomId];
  }

  export function addPlayerToRoom(room: Room, socket: Socket): Node<Player> {
    var players = room.players;

    const player = playerService.createPlayer(
      socket.id,
      "Player" + playerService.getNextUsername(players)
    );

    const newPlayer = players.append(player);

    return newPlayer;
  }

  export function removePlayerFromRoom(
    rooms: roomIdToRoomObjDict,
    room: Room,
    playerToDelete: Node<Player>
  ): Room {
    let players = room.players;

    players.delete(playerToDelete);

    if (_isPlayerAdmin(room, playerToDelete)) {
      _setNewRoomOwner(rooms, room);
    }

    return rooms[room.roomId];
  }

  // export function editPlayerUsername(
  //   rooms: Room[],
  //   socket: Socket,
  //   socketId: string,
  //   desiredUsername: string
  // ) {
  //   var players = _getPlayersInRoom(rooms, socket);
  //   if (players) {
  //     for (let player of players) {
  //       var playerId = player.playerSocketId;
  //       if (playerId === socketId) {
  //         player.username = desiredUsername;
  //       }
  //     }
  //   }
  // }

  // export function addArtistToRoom(
  //   rooms: Room[],
  //   socket: Socket,
  //   artist: SearchForArtistItem
  // ) {
  //   const room = roomService.findRoomBySocket(rooms, socket);
  //   const selectedArtists = room?.selectedArtists;

  //   // Only add if not already in the list
  //   if (
  //     selectedArtists &&
  //     !selectedArtists.some(
  //       (alreadySelected) => alreadySelected.id === artist.id
  //     )
  //   ) {
  //     room.selectedArtists = [...selectedArtists, artist];
  //   }
  // }

  // export function removeArtistFromRoom(
  //   rooms: Room[],
  //   socket: Socket,
  //   artist: SearchForArtistItem
  // ) {
  //   const room = roomService.findRoomBySocket(rooms, socket);
  //   const selectedArtists = room?.selectedArtists;

  //   if (selectedArtists) {
  //     room.selectedArtists = selectedArtists.filter((alreadySelected) => {
  //       return alreadySelected.id !== artist.id;
  //     });
  //   }
  // }
}

function _setNewRoomOwner(rooms: roomIdToRoomObjDict, room: Room) {
  const players = room.players;

  const head = players.getHead();
  if (head) {
    room.admin = head.data!.playerSocketId;
  } else {
    delete rooms[room.roomId];
  }
}

function _isPlayerAdmin(room: Room, player: Node<Player>): boolean {
  return room.admin === player.data?.playerSocketId;
}
