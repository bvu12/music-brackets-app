import { ActionIcon, createStyles, Table } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { SearchForArtistItem } from "../../../../shared/types";

const useStyles = createStyles((theme) => ({
  renameIcon: {
    color: theme.colors.red[6],
  },
}));

interface SelectedArtistsProps {
  artists: SearchForArtistItem[];
  onClick: (artist: SearchForArtistItem) => void;
}

export const SelectedArtists = ({ artists, onClick }: SelectedArtistsProps) => {
  const { classes } = useStyles();

  // Table rows
  const rows = artists?.map((artist) => {
    const removeButton = (
      <ActionIcon
        variant="default"
        radius="md"
        size={36}
        onClick={() => onClick(artist)}
        ml="auto"
      >
        <IconX size={18} className={classes.renameIcon} stroke={1.5} />
      </ActionIcon>
    );

    return (
      <tr key={artist.id}>
        <td>{artist.name}</td>

        <td>{removeButton}</td>
      </tr>
    );
  });

  // TODO: Change from strict Table to side-by-side
  return (
    <div>
      <h1>You've selected: </h1>
      <Table horizontalSpacing="xl" fontSize="xl">
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};
