import { useEffect, useState } from "react";
import { Card, Paper, Text, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { SearchForArtist } from "../../../shared/types";

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

  const iconSearch = <IconSearch size={18} stroke={2} />;

  // On user search, get results from API
  useEffect(() => {
    if (searchString) {
      getSearchResults().then((results: SearchForArtist) => {
        setSearchResults(results);
        console.log(results.artists.items);
      });
    }
  }, [searchString]);

  return (
    <Paper shadow="xs" ml="3%">
      <Card radius="lg" w="100%" h={600}>
        <TextInput
          icon={iconSearch}
          placeholder="Who do you want to listen to?"
          style={{ flex: 1 }}
          onChange={(event) => setSearchString(event.currentTarget.value)}
        />
        {searchResults &&
          searchResults.artists.items.map((item) => {
            return <p>{item.name}</p>;
          })}
      </Card>
    </Paper>
  );
};
