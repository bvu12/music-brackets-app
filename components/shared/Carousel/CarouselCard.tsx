import { createStyles, Paper, Text, Title } from "@mantine/core";

export interface CardProps {
  image: string;
  title: string;
  category: string;
  button?: React.ReactNode;
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

export const CarouselCard = ({ image, title, category, button }: CardProps) => {
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
      {button}
    </Paper>
  );
};
