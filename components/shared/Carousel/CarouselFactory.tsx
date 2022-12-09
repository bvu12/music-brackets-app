import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles, useMantineTheme } from "@mantine/core";

interface CarouselFactoryProps {
  cards?: React.ReactNode;
  styles: { [className: string]: any };
}

export const CarouselFactory = ({ cards, styles }: CarouselFactoryProps) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const useStyles = createStyles((theme) => styles);
  const { classes } = useStyles();

  return (
    <Carousel
      className={classes.carousel}
      slideSize={350}
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: "lg" }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 3}
      loop
      withIndicators
      controlSize={34}
    >
      {cards}
    </Carousel>
  );
};
