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
  external_urls: NewReleaseExternalUrls;
  href: string;
  id: string;
  images: NewReleaseImages[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface NewReleaseArtists {
  external_urls: NewReleaseExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface NewReleaseImages {
  height: number;
  url: string;
  width: number;
}

export interface NewReleaseExternalUrls {
  spotify: string;
}
