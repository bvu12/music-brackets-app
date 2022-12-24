import { ActionIcon, Card, Center, createStyles, Tooltip } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import { useState } from "react";
import { SettingsModal } from "./SettingsModal/SettingsModal";

const useStyles = createStyles((theme) => ({
  settingsIcon: {
    color: theme.colors.red[6],
  },
}));

export const Settings = () => {
  // Modal state
  const [opened, setOpened] = useState(false);

  const { classes } = useStyles();
  const _size = 100;

  const onSettingsClick = () => {
    setOpened(true);
  };

  return (
    <div>
      <SettingsModal opened={opened} setOpened={setOpened} />
      <Tooltip
        label="Game settings"
        color="#1DB954"
        position="left"
        withArrow
        closeDelay={500}
        fz={18}
        fw={700}
      >
        <ActionIcon
          variant="default"
          radius="md"
          size={_size}
          onClick={() => onSettingsClick()}
          ml="auto"
          mr="10%"
          mt="5%"
        >
          <IconSettings
            size={_size}
            className={classes.settingsIcon}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};
