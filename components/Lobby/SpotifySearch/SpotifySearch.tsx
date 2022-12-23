import { useEffect, useState } from "react";
import { Card, Paper, Text, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { SearchForArtist, SearchForArtistItem } from "../../../shared/types";
import { SpotifyBannerSearch } from "./SpotifyBannerSearch/SpotifyBannerSearch";
import { SelectedArtists } from "./SelectedArtists/SelectedArtists";

async function getSearchResults() {
  const res = await fetch("/api/fake_get_artist_search_results");

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const SpotifySearch = () => {
  const [searchString, setSearchString] = useDebouncedState("", 400);
  const [searchResults, setSearchResults] = useState<SearchForArtist>();
  const [selectedArtists, setSelectedArtists] = useState<SearchForArtistItem[]>(
    []
  );

  // On user search, get results from API
  useEffect(() => {
    if (searchString) {
      getSearchResults().then((results: SearchForArtist) => {
        setSearchResults(results);
      });
    }
  }, [searchString]);

  // On click, add to selected artists
  const onClickArtist = (artist: SearchForArtistItem) => {
    if (
      !selectedArtists.some(
        (alreadySelected) => alreadySelected.id === artist.id
      )
    ) {
      setSelectedArtists([...selectedArtists, artist]);
    }
  };

  const iconSearch = <IconSearch size={18} stroke={2} />;
  return (
    <Paper shadow="xs" ml="3%">
      <Card radius="lg" w="100%" h={800}>
        <TextInput
          icon={iconSearch}
          placeholder="Who do you want to listen to?"
          style={{ flex: 1 }}
          onChange={(event) => setSearchString(event.currentTarget.value)}
        />
        {searchResults && (
          <SpotifyBannerSearch
            searches={searchResults}
            onClick={onClickArtist}
          />
        )}
        {selectedArtists && <SelectedArtists artists={selectedArtists} />}
      </Card>
    </Paper>
  );
};
