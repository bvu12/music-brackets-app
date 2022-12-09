import { Carousel, CarouselProps } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles, useMantineTheme } from "@mantine/core";

interface CarouselFactoryProps {
  cards?: React.ReactNode;
  styles: { [className: string]: any };
  carouselOptions: CarouselProps;
}

export const CarouselFactory = ({
  cards,
  styles,
  carouselOptions,
}: CarouselFactoryProps) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const useStyles = createStyles((theme) => styles);
  const { classes } = useStyles();

  return (
    <Carousel
      className={classes.carousel}
      slideSize={carouselOptions.slideSize}
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: "lg" }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 3}
      loop={carouselOptions.loop}
      controlSize={34}
      styles={{
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
      }}
    >
      {cards}
    </Carousel>
  );
};
