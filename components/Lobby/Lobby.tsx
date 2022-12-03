import { useContext } from "react";
import { SocketContext } from "../SocketContext/socket";

import { Player } from "../../shared/types";
import { RenameUser } from "./RenameUser/RenameUser";
import { LobbyCode } from "./LobbyCode/LobbeCode";

interface LobbyProps {
  roomName: string;
  isRoomOwner: boolean;
  players: Player[];
}

export const Lobby = ({ roomName, isRoomOwner, players }: LobbyProps) => {
  const socket = useContext(SocketContext);

  return (
    <div>
      <LobbyCode code={roomName} />
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
