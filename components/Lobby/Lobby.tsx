import { useContext } from "react";
import { SocketContext } from "../SocketContext/socket";

import { Player } from "../../shared/types";
import { PlayersInLobby as PlayersInLobby } from "./PlayersInLobby/PlayersInLobby";
import { LobbyCode } from "./LobbyCode/LobbyCode";
import { Settings } from "./Settings/Settings";
import { StartGame } from "./StartGame/StartGame";

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
      <PlayersInLobby players={players} />
      <Settings />
      <StartGame isRoomOwner={isRoomOwner} />
    </div>
  );
};
