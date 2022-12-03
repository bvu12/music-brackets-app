import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  useMantineTheme,
  Button,
} from "@mantine/core";

import { NewReleases } from "../../../shared/types";

interface SpotifyBannerNewReleasesProps {
  newReleases?: NewReleases;
}

interface CardProps {
  image: string;
  title: string;
  category: string;
}

const useStyles = createStyles((theme) => ({
  card: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  category: {
    color: "red",
    opacity: 0.7,
    fontWeight: 900,
    fontSize: 22,
    textTransform: "uppercase",
    width: "100%",
    textAlign: "end",
  },
}));

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Title className={classes.title}>{title}</Title>{" "}
      </div>
      <Text className={classes.category}>{category}</Text>
    </Paper>
  );
}

export const SpotifyBannerNewReleases = ({
  newReleases,
}: SpotifyBannerNewReleasesProps) => {
  const releases = newReleases?.albums.items;

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = releases?.map((release) => {
    const main_artist = release.artists[0].name;
    const release_name = release.name;
    const image_url = release.images[0].url;

    const card: CardProps = {
      image: image_url,
      title: main_artist,
      category: release_name,
    };

    return (
      <Carousel.Slide key={release_name}>
        <Card {...card} />
      </Carousel.Slide>
    );
  });

  return (
    <div>
      {releases && (
        <Carousel
          mt={200}
          mx={550}
          slideSize={350}
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: "lg" }]}
          slideGap="xl"
          align="start"
          slidesToScroll={mobile ? 1 : 3}
          loop
          withIndicators
          controlSize={34}
        >
          {slides}
        </Carousel>
      )}
    </div>
  );
};
