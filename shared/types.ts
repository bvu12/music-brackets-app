import { Room } from "../server/types/types";

export interface Player {
  playerSocketId: string;
  username: string;
  isRoomOwner: boolean;
}

export interface PlayerToRoomDict {
  [socketId: string]: {
    player: Player;
    room: Room;
  };
}

export interface NewReleases {
  albums: {
    href: string;
    items: NewReleaseItem[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
}

export interface NewReleaseItem {
  album_type: string;
  artists: NewReleaseArtists[];
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImages[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface NewReleaseArtists {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyImages {
  height: number;
  url: string;
  width: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SearchForArtist {
  artists: {
    href: string;
    items: SearchForArtistItem[];
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
  };
}

export interface SearchForArtistItem {
  external_urls: SpotifyExternalUrls;
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImages[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
