import { SearchForArtistItem } from "../../../../shared/types";

interface SelectedArtistsProps {
  artists: SearchForArtistItem[];
}

export const SelectedArtists = ({ artists }: SelectedArtistsProps) => {
  const selectedArtists = artists.map((artist) => <p>{artist.href}</p>);

  return <div>{selectedArtists}</div>;
};
