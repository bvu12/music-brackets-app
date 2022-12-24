import { useState, useContext } from "react";
import { ActionIcon, createStyles, Table, Card } from "@mantine/core";
import { SocketContext } from "../../SocketContext/socket";
import { IconCrown, IconEdit } from "@tabler/icons";
import { Player } from "../../../shared/types";
import { RenameUserModal } from "./RenameUserModal/RenameUserModal";

const useStyles = createStyles((theme) => ({
  renameIcon: {
    color: theme.colors.red[6],
  },
  ownerIcon: {
    color: "yellow",
  },
}));

interface PlayersInLobbyProps {
  players: Player[];
}

export const PlayersInLobby = ({ players }: PlayersInLobbyProps) => {
  const socket = useContext(SocketContext);
  const { classes, theme } = useStyles();

  // Modal state
  const [opened, setOpened] = useState(false);

  // Table rows
  const rows = players?.map((player) => {
    let ownerCrown = null;
    let renameButton = null;

    if (player.isRoomOwner) {
      ownerCrown = (
        <IconCrown size={18} className={classes.ownerIcon} stroke={1.5} />
      );
    }

    if (socket.id === player.playerSocketId) {
      renameButton = (
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          onClick={() => setOpened(true)}
          ml="auto"
        >
          <IconEdit size={18} className={classes.renameIcon} stroke={1.5} />
        </ActionIcon>
      );
    }

    return (
      <tr key={player.playerSocketId}>
        <td>{ownerCrown}</td>
        <td>{player.username}</td>

        <td>{renameButton}</td>
      </tr>
    );
  });

  return (
    <Card radius="lg" mr="20%">
      <RenameUserModal opened={opened} setOpened={setOpened} />
      <Table horizontalSpacing="xl" fontSize="xl">
        <thead>
          <tr>
            <th></th>
            <th>Players:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};
