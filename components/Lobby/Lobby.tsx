import { useContext, useState } from "react";
import { SocketContext } from "../SocketContext/socket";

import { Player, SearchForArtistItem } from "../../shared/types";
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

  const [selectedArtists, setSelectedArtists] = useState<SearchForArtistItem[]>(
    []
  );

  // On click, add to selected artists
  const onClickAddArtist = (artist: SearchForArtistItem) => {
    if (
      !selectedArtists.some(
        (alreadySelected) => alreadySelected.id === artist.id
      )
    ) {
      setSelectedArtists([...selectedArtists, artist]);
    }
  };

  const onClickRemoveArtist = (artist: SearchForArtistItem) => {
    setSelectedArtists(
      selectedArtists.filter((alreadySelected) => {
        return alreadySelected.id !== artist.id;
      })
    );
  };

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
      <Grid.Col span={4}>{isRoomOwner && <StartGame />}</Grid.Col>
      <Grid.Col span={4}></Grid.Col>
    </Grid>
  );
};
