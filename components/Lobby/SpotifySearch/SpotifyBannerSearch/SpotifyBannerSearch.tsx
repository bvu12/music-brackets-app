import { Carousel, CarouselProps } from "@mantine/carousel";
import { Button } from "@mantine/core";
import { SearchForArtistItem } from "../../../../shared/types";
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
  isRoomOwner: boolean;
  searches?: SearchForArtistItem[];
  onClick: (artist: SearchForArtistItem) => void;
}

export const SpotifyBannerSearch = ({
  isRoomOwner,
  searches,
  onClick,
}: SpotifyBannerSearchProps) => {
  const cards = searches?.map((artist) => {
    const main_artist = artist.name;
    const image_url = artist.images[0].url;
    let button = null;

    if (isRoomOwner) {
      console.log("??");
      button = (
        <Button onClick={() => onClick(artist)} variant="white" color="dark">
          Select artist
        </Button>
      );
    }

    return (
      <Carousel.Slide key={main_artist}>
        <CarouselCard image={image_url} title={main_artist} button={button} />
      </Carousel.Slide>
    );
  });

  return (
    <div>
      {searches && (
        <CarouselFactory
          cards={cards}
          styles={carouselStyle}
          carouselOptions={carouselOptions}
        />
      )}
    </div>
  );
};
