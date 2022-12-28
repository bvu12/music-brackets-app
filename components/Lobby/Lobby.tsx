import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext/socket";

import { Player, SearchForArtistItem } from "../../shared/types";
import { PlayersInLobby as PlayersInLobby } from "./PlayersInLobby/PlayersInLobby";
import { LobbyCode } from "./LobbyCode/LobbyCode";
import { Settings } from "./Settings/Settings";
import { StartGame } from "./StartGame/StartGame";
import { SpotifySearch } from "./SpotifySearch/SpotifySearch";
import { Grid } from "@mantine/core";
import { RoomOwnerContext } from "../../pages";

interface LobbyProps {
  roomName: string;
  players: Player[];
}

export const Lobby = ({ roomName, players }: LobbyProps) => {
  const socket = useContext(SocketContext);
  const isRoomOwner = useContext(RoomOwnerContext);

  const [selectedArtists, setSelectedArtists] = useState<SearchForArtistItem[]>(
    []
  );
  const isStartGameDisabled = selectedArtists.length == 0;

  // Client actions
  const onClickAddArtist = (artist: SearchForArtistItem) => {
    socket.emit("add_selected_artist", artist);
  };

  const onClickRemoveArtist = (artist: SearchForArtistItem) => {
    socket.emit("remove_selected_artist", artist);
  };

  // Server responses
  useEffect(() => {
    socket.on("selected_artists", (artists: SearchForArtistItem[]) => {
      setSelectedArtists(artists);
    });
  });

  return (
    <Grid align="stretch" grow gutter="xl">
      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4}>
        <LobbyCode code={roomName} />
      </Grid.Col>
      <Grid.Col span={4}>{isRoomOwner && <Settings />}</Grid.Col>

      <Grid.Col span={10}>
        <SpotifySearch
          selectedArtists={selectedArtists}
          onClickAddArtist={onClickAddArtist}
          onClickRemoveArtist={onClickRemoveArtist}
        />
      </Grid.Col>
      <Grid.Col span={2}>
        <PlayersInLobby players={players} />
      </Grid.Col>

      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4}>
        {isRoomOwner && <StartGame disabled={isStartGameDisabled} />}
      </Grid.Col>
      <Grid.Col span={4}></Grid.Col>
    </Grid>
  );
};
