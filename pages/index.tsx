// SOURCE: https://github.com/machadop1407/socket-io-react-example/
import { useEffect, useState, useContext } from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SocketContext } from "../components/SocketContext/socket";

import { Player } from "../shared/types";
import { LandingPage } from "../components/LandingPage/LandingPage";
import { Lobby } from "../components/Lobby/Lobby";

function getRoomIdFromString(message: string): string {
  let roomId = message.match(/'(.*?)'/g);
  if (roomId) {
    return roomId[0].replace(/'/g, "");
  } else {
    return "";
  }
}

export default function Home() {
  // Socket
  const socket = useContext(SocketContext);

  //Room State
  const [roomName, setRoomName] = useState<string>("");
  const [isInRoom, setIsInRoom] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);

  // Server responses
  useEffect(() => {
    socket.on("create-room-msg", (message: string) => {
      setRoomName(getRoomIdFromString(message));
      setIsInRoom(true);
      setIsRoomOwner(true);
    });

    socket.on("join-room-msg", (message: string) => {
      setRoomName(getRoomIdFromString(message));
      setIsInRoom(true);
    });

    socket.on("players-in-room", (players: Player[]) => {
      setPlayers(players);
    });
  });

  return isInRoom ? (
    <Lobby roomName={roomName} isRoomOwner={isRoomOwner} players={players} />
  ) : (
    <LandingPage />
  );
}
