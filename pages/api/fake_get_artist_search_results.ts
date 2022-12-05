// GET https://api.spotify.com/v1/search?q=artist%3A{{artist name}}&type=artist&limit=10
import type { NextApiRequest, NextApiResponse } from "next";
import { SearchForArtist } from "../../shared/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchForArtist>
) {
  // Return varying subset to emulate getting different search results
  let _search_results = JSON.parse(JSON.stringify(search_results)); // deepcopy
  let _items = _search_results.artists.items;
  _items = _items.slice(0, Math.floor(Math.random() * _items.length));
  _search_results.artists.items = _items;

  res.status(200).json(_search_results);
}

const search_results = {
  artists: {
    href: "https://api.spotify.com/v1/search?query=artist%3ADrake&type=artist&offset=0&limit=10",
    items: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
        },
        followers: {
          href: null,
          total: 69330623,
        },
        genres: [
          "canadian hip hop",
          "canadian pop",
          "hip hop",
          "rap",
          "toronto rap",
        ],
        href: "https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4",
        id: "3TVXtAsR1Inumwj472S9r4",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f1784293385d324db8558179afd9",
            width: 160,
          },
        ],
        name: "Drake",
        popularity: 97,
        type: "artist",
        uri: "spotify:artist:3TVXtAsR1Inumwj472S9r4",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/0p4ViyfJUTW0IT4SCBLexf",
        },
        followers: {
          href: null,
          total: 276722,
        },
        genres: ["cali rap", "viral rap"],
        href: "https://api.spotify.com/v1/artists/0p4ViyfJUTW0IT4SCBLexf",
        id: "0p4ViyfJUTW0IT4SCBLexf",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5eba603aef1d62687aa6af6f01f",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab67616100005174a603aef1d62687aa6af6f01f",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f178a603aef1d62687aa6af6f01f",
            width: 160,
          },
        ],
        name: "Drakeo the Ruler",
        popularity: 62,
        type: "artist",
        uri: "spotify:artist:0p4ViyfJUTW0IT4SCBLexf",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/5c3GLXai8YOMid29ZEuR9y",
        },
        followers: {
          href: null,
          total: 671804,
        },
        genres: [
          "art rock",
          "british folk",
          "folk",
          "folk rock",
          "melancholia",
          "rock",
          "singer-songwriter",
        ],
        href: "https://api.spotify.com/v1/artists/5c3GLXai8YOMid29ZEuR9y",
        id: "5c3GLXai8YOMid29ZEuR9y",
        images: [
          {
            height: 1484,
            url: "https://i.scdn.co/image/d364b498f85ae764cd278fbba9a8ed7f00c3e434",
            width: 1000,
          },
          {
            height: 950,
            url: "https://i.scdn.co/image/087fb05851e498c2791ca99000acf35b0fd49f19",
            width: 640,
          },
          {
            height: 297,
            url: "https://i.scdn.co/image/9a74a7d885abe5da94ac812546d0146cfe4a1ceb",
            width: 200,
          },
          {
            height: 95,
            url: "https://i.scdn.co/image/267080662cf3c019ea8020a4e0e8dd5a7be4d909",
            width: 64,
          },
        ],
        name: "Nick Drake",
        popularity: 61,
        type: "artist",
        uri: "spotify:artist:5c3GLXai8YOMid29ZEuR9y",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/1swkyc2nwzfkcD1aLCSkxK",
        },
        followers: {
          href: null,
          total: 348,
        },
        genres: [],
        href: "https://api.spotify.com/v1/artists/1swkyc2nwzfkcD1aLCSkxK",
        id: "1swkyc2nwzfkcD1aLCSkxK",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5ebcf4e2cae915bb0f680640718",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab67616100005174cf4e2cae915bb0f680640718",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f178cf4e2cae915bb0f680640718",
            width: 160,
          },
        ],
        name: "draken",
        popularity: 48,
        type: "artist",
        uri: "spotify:artist:1swkyc2nwzfkcD1aLCSkxK",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/2y7pPMQioLwMFUKhK9Pyow",
        },
        followers: {
          href: null,
          total: 13454,
        },
        genres: ["british singer-songwriter"],
        href: "https://api.spotify.com/v1/artists/2y7pPMQioLwMFUKhK9Pyow",
        id: "2y7pPMQioLwMFUKhK9Pyow",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5eb738ea8e320dbffaab43d8178",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab67616100005174738ea8e320dbffaab43d8178",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f178738ea8e320dbffaab43d8178",
            width: 160,
          },
        ],
        name: "Eleni Drake",
        popularity: 39,
        type: "artist",
        uri: "spotify:artist:2y7pPMQioLwMFUKhK9Pyow",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/03ilIKH0i08IxmjKcn63ne",
        },
        followers: {
          href: null,
          total: 369851,
        },
        genres: ["post-teen pop"],
        href: "https://api.spotify.com/v1/artists/03ilIKH0i08IxmjKcn63ne",
        id: "03ilIKH0i08IxmjKcn63ne",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5ebf022697d475649654541eecc",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab67616100005174f022697d475649654541eecc",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f178f022697d475649654541eecc",
            width: 160,
          },
        ],
        name: "Drake Bell",
        popularity: 48,
        type: "artist",
        uri: "spotify:artist:03ilIKH0i08IxmjKcn63ne",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/2AwOVo6BFI8rc9MyNBIrj3",
        },
        followers: {
          href: null,
          total: 481,
        },
        genres: [],
        href: "https://api.spotify.com/v1/artists/2AwOVo6BFI8rc9MyNBIrj3",
        id: "2AwOVo6BFI8rc9MyNBIrj3",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5ebdfebb14511d71452526a7abb",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab67616100005174dfebb14511d71452526a7abb",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f178dfebb14511d71452526a7abb",
            width: 160,
          },
        ],
        name: "Drake Stafford",
        popularity: 21,
        type: "artist",
        uri: "spotify:artist:2AwOVo6BFI8rc9MyNBIrj3",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/7rvB7ONJSqlmaCrcbhelir",
        },
        followers: {
          href: null,
          total: 11310,
        },
        genres: ["la pop"],
        href: "https://api.spotify.com/v1/artists/7rvB7ONJSqlmaCrcbhelir",
        id: "7rvB7ONJSqlmaCrcbhelir",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5eb5e063d167934df2e5b9a9880",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab676161000051745e063d167934df2e5b9a9880",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f1785e063d167934df2e5b9a9880",
            width: 160,
          },
        ],
        name: "Jamie Drake",
        popularity: 39,
        type: "artist",
        uri: "spotify:artist:7rvB7ONJSqlmaCrcbhelir",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/4mskfuiHWZ3nX3qAdeaGiR",
        },
        followers: {
          href: null,
          total: 67194,
        },
        genres: [],
        href: "https://api.spotify.com/v1/artists/4mskfuiHWZ3nX3qAdeaGiR",
        id: "4mskfuiHWZ3nX3qAdeaGiR",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5eb65bd62793671d963209ff951",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab6761610000517465bd62793671d963209ff951",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f17865bd62793671d963209ff951",
            width: 160,
          },
        ],
        name: "Drake Milligan",
        popularity: 49,
        type: "artist",
        uri: "spotify:artist:4mskfuiHWZ3nX3qAdeaGiR",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/29ijED2bnnprp2TciAK1aO",
        },
        followers: {
          href: null,
          total: 99729,
        },
        genres: ["contemporary country"],
        href: "https://api.spotify.com/v1/artists/29ijED2bnnprp2TciAK1aO",
        id: "29ijED2bnnprp2TciAK1aO",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5ebfcdf7ed1c10fd9f03bd2e14e",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab67616100005174fcdf7ed1c10fd9f03bd2e14e",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f178fcdf7ed1c10fd9f03bd2e14e",
            width: 160,
          },
        ],
        name: "Drake White",
        popularity: 52,
        type: "artist",
        uri: "spotify:artist:29ijED2bnnprp2TciAK1aO",
      },
    ],
    limit: 10,
    next: "https://api.spotify.com/v1/search?query=artist%3ADrake&type=artist&offset=10&limit=10",
    offset: 0,
    previous: null,
    total: 1090,
  },
};
