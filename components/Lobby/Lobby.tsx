import { useContext } from "react";
import { SocketContext } from "../SocketContext/socket";

import { Player } from "../../shared/types";
import { RenameUser } from "./RenameUser/RenameUser";
import { Timer } from "./Timer/Timer";

interface LobbyProps {
  roomName: string;
  isRoomOwner: boolean;
  players: Player[];
}

export const Lobby = ({ roomName, isRoomOwner, players }: LobbyProps) => {
  const socket = useContext(SocketContext);

  return (
    <div>
      <h1>You have joined room: {roomName}</h1>
      <Timer isRoomOwner={isRoomOwner} />
      {players.map((player: Player) => {
        return socket.id === player.playerSocketId ? (
          <RenameUser username={player.username} />
        ) : (
          <div key="playerSocketId"> {player.username} </div>
        );
      })}
    </div>
  );
};
