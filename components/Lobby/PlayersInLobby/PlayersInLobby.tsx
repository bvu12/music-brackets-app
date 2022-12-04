import { useState, useContext } from "react";
import { ActionIcon, createStyles, Table, Card } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SocketContext } from "../../SocketContext/socket";
import { IconEdit } from "@tabler/icons";
import { Player } from "../../../shared/types";
import { RenameUser } from "./RenameUser.tsx/RenameUser";

const useStyles = createStyles((theme) => ({
  renameIcon: {
    color: theme.colors.red[6],
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
    let renameButton;

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
    } else {
      renameButton = null;
    }

    return (
      <tr key={player.playerSocketId}>
        <td>{player.username}</td>

        <td>{renameButton}</td>
      </tr>
    );
  });

  return (
    <Card radius="lg" mr="20%">
      <RenameUser opened={opened} setOpened={setOpened} />
      <Table horizontalSpacing="xl" fontSize="xl">
        <thead>
          <tr>
            <th>Players:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};
