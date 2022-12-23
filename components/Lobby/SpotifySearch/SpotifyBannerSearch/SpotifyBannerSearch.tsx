import { Carousel, CarouselProps } from "@mantine/carousel";
import { Button } from "@mantine/core";
import { SearchForArtist, SearchForArtistItem } from "../../../../shared/types";
import { CarouselCard } from "../../../shared/Carousel/CarouselCard";
import { CarouselFactory } from "../../../shared/Carousel/CarouselFactory";

const carouselStyle: Record<string, React.CSSProperties> = {
  carousel: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
};

const carouselOptions: CarouselProps = {
  slideSize: 550,
  loop: false,
};

interface SpotifyBannerSearchProps {
  searches?: SearchForArtist;
  onClick: (artist: SearchForArtistItem) => void;
}

export const SpotifyBannerSearch = ({
  searches,
  onClick,
}: SpotifyBannerSearchProps) => {
  const artists = searches?.artists.items;

  const cards = artists?.map((artist) => {
    const main_artist = artist.name;
    const image_url = artist.images[0].url;

    return (
      <Carousel.Slide key={main_artist}>
        <CarouselCard
          image={image_url}
          title={main_artist}
          button={
            <Button
              onClick={() => onClick(artist)}
              variant="white"
              color="dark"
            >
              Select artist
            </Button>
          }
        />
      </Carousel.Slide>
    );
  });

  return (
    <div>
      {artists && (
        <CarouselFactory
          cards={cards}
          styles={carouselStyle}
          carouselOptions={carouselOptions}
        />
      )}
    </div>
  );
};
