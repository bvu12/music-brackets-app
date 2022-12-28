import { useContext, useEffect, useState } from "react";
import { Card, Paper, Text, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { SearchForArtist, SearchForArtistItem } from "../../../shared/types";
import { SpotifyBannerSearch } from "./SpotifyBannerSearch/SpotifyBannerSearch";
import { SelectedArtists } from "./SelectedArtists/SelectedArtists";
import { RoomOwnerContext } from "../../../pages";

async function getSearchResults() {
  const res = await fetch("/api/fake_get_artist_search_results");

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface SpotifySearchProps {
  selectedArtists: SearchForArtistItem[];
  onClickAddArtist: (artist: SearchForArtistItem) => void;
  onClickRemoveArtist: (artist: SearchForArtistItem) => void;
}

export const SpotifySearch = ({
  selectedArtists,
  onClickAddArtist,
  onClickRemoveArtist,
}: SpotifySearchProps) => {
  const isRoomOwner = useContext(RoomOwnerContext);
  const [searchString, setSearchString] = useDebouncedState("", 400);
  const [searchResults, setSearchResults] = useState<SearchForArtistItem[]>();

  // On user search, get results from API
  useEffect(() => {
    if (searchString) {
      getSearchResults().then((results: SearchForArtist) => {
        setSearchResults(results.artists.items);
      });
    }
  }, [searchString]);

  const iconSearch = <IconSearch size={18} stroke={2} />;
  return (
    <Paper shadow="xs" ml="3%">
      <Card radius="lg" w="100%" h={750}>
        {isRoomOwner && (
          <TextInput
            icon={iconSearch}
            placeholder="Who do you want to listen to?"
            style={{ flex: 1 }}
            onChange={(event) => setSearchString(event.currentTarget.value)}
          />
        )}
        {isRoomOwner && searchResults && (
          <SpotifyBannerSearch
            searches={searchResults}
            onClick={onClickAddArtist}
          />
        )}
        {!isRoomOwner &&
          selectedArtists && ( // Lobby participants only see the selected artists
            <SpotifyBannerSearch
              searches={selectedArtists}
              onClick={onClickAddArtist}
            />
          )}
        {isRoomOwner && selectedArtists && (
          <SelectedArtists
            artists={selectedArtists}
            onClick={onClickRemoveArtist}
          />
        )}
      </Card>
    </Paper>
  );
};
