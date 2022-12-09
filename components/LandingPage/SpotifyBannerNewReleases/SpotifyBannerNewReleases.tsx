import { Carousel } from "@mantine/carousel";

import { NewReleases } from "../../../shared/types";
import { CarouselCard } from "../../shared/Carousel/CarouselCard";
import { CarouselFactory } from "../../shared/Carousel/CarouselFactory";

const carouselStyle: Record<string, React.CSSProperties> = {
  carousel: {
    marginTop: 200,
    marginLeft: 275,
    marginRight: 275,
  },
};

export interface SpotifyBannerNewReleasesProps {
  newReleases?: NewReleases;
}

export const SpotifyBannerNewReleases = ({
  newReleases,
}: SpotifyBannerNewReleasesProps) => {
  const releases = newReleases?.albums.items;
  const cards = releases?.map((release) => {
    const main_artist = release.artists[0].name;
    const release_name = release.name;
    const image_url = release.images[0].url;

    return (
      <Carousel.Slide key={release_name}>
        <CarouselCard
          image={image_url}
          title={main_artist}
          category={release_name}
        />
      </Carousel.Slide>
    );
  });

  return (
    <div>
      {releases && <CarouselFactory cards={cards} styles={carouselStyle} />}
    </div>
  );
};
