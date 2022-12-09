import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  useMantineTheme,
  Button,
  Group,
} from "@mantine/core";
import { SearchForArtist } from "../../../../shared/types";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";

interface SpotifySearchCardsProps {
  searches: SearchForArtist;
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
      <Button
        onClick={() => alert("Implement me!")}
        variant="white"
        color="dark"
      >
        Select artist
      </Button>
    </Paper>
  );
}

export const SpotifySearchCards = ({ searches }: SpotifySearchCardsProps) => {
  const artists = searches.artists.items;
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = artists?.map((artist) => {
    const main_artist = artist.name;
    const image_url = artist.images[0].url;

    const card: CardProps = {
      image: image_url,
      title: main_artist,
      category: "",
    };

    return (
      <Carousel.Slide key={main_artist}>
        <Card {...card} />
      </Carousel.Slide>
    );
  });

  return (
    <div>
      {artists && (
        <Carousel
          mt={40}
          mx={25}
          slideSize={400}
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: "lg" }]}
          slideGap="xl"
          align="start"
          slidesToScroll={mobile ? 1 : 3}
          loop
          withIndicators
          controlSize={34}
          nextControlIcon={<IconArrowRight size={16} />}
          previousControlIcon={<IconArrowLeft size={16} />}
          styles={{
            control: {
              "&[data-inactive]": {
                opacity: 0,
                cursor: "default",
              },
            },
          }}
        >
          {slides}
        </Carousel>
      )}
    </div>
  );
};
