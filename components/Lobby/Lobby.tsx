import { useContext } from "react";
import { SocketContext } from "../SocketContext/socket";

import { Player } from "../../shared/types";
import { PlayersInLobby as PlayersInLobby } from "./PlayersInLobby/PlayersInLobby";
import { LobbyCode } from "./LobbyCode/LobbyCode";
import { Settings } from "./Settings/Settings";
import { StartGame } from "./StartGame/StartGame";
import { SpotifySearch } from "./SpotifySearch/SpotifySearch";
import { Grid } from "@mantine/core";

interface LobbyProps {
  roomName: string;
  isRoomOwner: boolean;
  players: Player[];
}

export const Lobby = ({ roomName, isRoomOwner, players }: LobbyProps) => {
  const socket = useContext(SocketContext);

  return (
    <Grid align="stretch" grow gutter="xl">
      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4}>
        <LobbyCode code={roomName} />
      </Grid.Col>
      <Grid.Col span={4}>{isRoomOwner && <Settings />}</Grid.Col>

      <Grid.Col span={10}>
        <SpotifySearch />
      </Grid.Col>
      <Grid.Col span={2}>
        <PlayersInLobby players={players} />
      </Grid.Col>

      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4}>{isRoomOwner && <StartGame />}</Grid.Col>
      <Grid.Col span={4}></Grid.Col>
    </Grid>
  );
};
