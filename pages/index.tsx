// SOURCE: https://github.com/machadop1407/socket-io-react-example/
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../components/SocketContext/socket";

import { Player } from "../shared/types";
import { LandingPage } from "../components/LandingPage/LandingPage";
import { Lobby } from "../components/Lobby/Lobby";
import React from "react";

function getRoomIdFromString(message: string): string {
  let roomId = message.match(/'(.*?)'/g);
  if (roomId) {
    return roomId[0].replace(/'/g, "");
  } else {
    return "";
  }
}

export const RoomOwnerContext = React.createContext(false);

export default function Home() {
  // Socket
  const socket = useContext(SocketContext);

  //Room State
  const [roomName, setRoomName] = useState<string>("");
  const [isInRoom, setIsInRoom] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);

  const updateRoomOwnership = () => {
    players?.map((player) => {
      if (
        socket.id === player.playerSocketId &&
        isRoomOwner != player.isRoomOwner
      ) {
        setIsRoomOwner(player.isRoomOwner);
      }
    });
  };

  // Server responses
  useEffect(() => {
    socket.on("create-room-msg", (message: string) => {
      setRoomName(getRoomIdFromString(message));
      setIsInRoom(true);
    });

    socket.on("join-room-msg", (message: string) => {
      setRoomName(getRoomIdFromString(message));
      setIsInRoom(true);
    });

    socket.on("players-in-room", (players: Player[]) => {
      setPlayers(players);
    });
  });

  useEffect(() => {
    updateRoomOwnership();
  }, [players]);

  return isInRoom ? (
    <RoomOwnerContext.Provider value={isRoomOwner}>
      <Lobby roomName={roomName} players={players} />
    </RoomOwnerContext.Provider>
  ) : (
    <LandingPage />
  );
}
