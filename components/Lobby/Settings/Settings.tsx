import { ActionIcon, createStyles, Tooltip } from "@mantine/core";
import { IconSettings } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  settingsIcon: {
    color: theme.colors.red[6],
  },
}));

export const Settings = () => {
  const { classes, theme } = useStyles();
  const _size = 100;

  const onSettingsClick = () => {
    alert("TODO: implement me!");
  };

  return (
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
      >
        <IconSettings
          size={_size}
          className={classes.settingsIcon}
          stroke={1.5}
        />
      </ActionIcon>
    </Tooltip>
  );
};
