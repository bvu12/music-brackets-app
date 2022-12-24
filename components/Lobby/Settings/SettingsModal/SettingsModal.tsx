import { Dispatch, useRef, useState } from "react";
import {
  Modal,
  Text,
  Group,
  SegmentedControl,
  createStyles,
  Paper,
  ActionIcon,
  NumberInput,
  NumberInputHandlers,
  Slider,
  Select,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },

  numRoundsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `6px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,

    "&:focus-within": {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  numRoundsControl: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,

    "&:disabled": {
      borderColor:
        theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: "transparent",
    },
  },

  numRoundsInput: {
    textAlign: "center",
    paddingRight: `${theme.spacing.sm}px !important`,
    paddingLeft: `${theme.spacing.sm}px !important`,
    height: 28,
    flex: 1,
  },
}));

enum GameTypeSettings {
  SONGS = "Songs",
  ALBUMS = "Albums",
}

enum NumRoundSettings {
  MIN = 1,
  MAX = 5,
  DEFAULT = 4,
}

enum TimerSettings {
  MIN = 15,
  MAX = 120,
  DEFAULT = 60,
  STEP = 5,
}

enum TiebreakerSettings {
  POPULARITY = "Popularity",
  RANDOM = "Random",
}

interface SettingsModalProps {
  opened: boolean;
  setOpened: Dispatch<boolean>;
}

export const SettingsModal = ({ opened, setOpened }: SettingsModalProps) => {
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>(null);

  // State for game settings
  const [gameType, setGameType] = useState<GameTypeSettings>(
    GameTypeSettings.SONGS
  );
  const [numRounds, setNumRounds] = useState<number | undefined>(
    NumRoundSettings.DEFAULT
  );
  const [timerLength, setTimerLength] = useState<number | undefined>(
    TimerSettings.DEFAULT
  );
  const [tiebreaker, setTiebreaker] = useState<TiebreakerSettings>(
    TiebreakerSettings.POPULARITY
  );

  return (
    <Modal size="40%" opened={opened} onClose={() => setOpened(false)}>
      <Group position="apart" mt="md">
        <Paper w="70%">
          <Text size={24} weight="bolder">
            GAME TYPE
          </Text>
          <Text>
            Choose your game type: song versus song or album versus album.
          </Text>
        </Paper>
        <SegmentedControl
          radius="xl"
          size="md"
          value={gameType}
          onChange={(value) => setGameType(value as GameTypeSettings)}
          data={[GameTypeSettings.SONGS, GameTypeSettings.ALBUMS]}
          classNames={classes}
        />
      </Group>
      <Group position="apart" mt="md">
        <Paper w="70%">
          <Text size={24} weight="bolder">
            NUMBER OF ROUNDS
          </Text>
          <Text>
            Bracket style. If there are not enough songs or albums to fit your
            desired number of rounds then the game will round down.
          </Text>
        </Paper>
        <div className={classes.numRoundsWrapper}>
          <ActionIcon<"button">
            size={28}
            variant="transparent"
            onClick={() => handlers.current?.decrement()}
            disabled={numRounds === NumRoundSettings.MIN}
            className={classes.numRoundsControl}
            onMouseDown={(event) => event.preventDefault()}
          >
            <IconMinus size={16} stroke={1.5} />
          </ActionIcon>

          <NumberInput
            variant="unstyled"
            min={NumRoundSettings.MIN}
            max={NumRoundSettings.MAX}
            handlersRef={handlers}
            value={numRounds}
            onChange={setNumRounds}
            classNames={{ input: classes.numRoundsInput }}
          />

          <ActionIcon<"button">
            size={28}
            variant="transparent"
            onClick={() => handlers.current?.increment()}
            disabled={numRounds === NumRoundSettings.MAX}
            className={classes.numRoundsControl}
            onMouseDown={(event) => event.preventDefault()}
          >
            <IconPlus size={16} stroke={1.5} />
          </ActionIcon>
        </div>
      </Group>
      <Group position="apart" mt="md">
        <Paper w="70%">
          <Text size={24} weight="bolder">
            TIMER
          </Text>
          <Text>Maximum number of seconds per round.</Text>
        </Paper>
        <Slider
          w="25%"
          labelAlwaysOn
          value={timerLength}
          min={TimerSettings.MIN}
          max={TimerSettings.MAX}
          step={TimerSettings.STEP}
          onChange={setTimerLength}
          marks={[
            { value: 30, label: "30s" },
            { value: 60, label: "60s" },
            { value: 90, label: "90s" },
            { value: 120, label: "120s" },
          ]}
        />
      </Group>
      <Group position="apart" mt="md">
        <Paper w="70%">
          <Text size={24} weight="bolder">
            TIE-BREAKER LOGIC
          </Text>
          <Text>
            Logic to break a tie. Popularity is determined by Spotify's
            algorithm.
          </Text>
        </Paper>
        <Select
          placeholder={tiebreaker}
          onChange={(value) => setTiebreaker(value as TiebreakerSettings)}
          data={[TiebreakerSettings.POPULARITY, TiebreakerSettings.RANDOM]}
          radius="xl"
        />
      </Group>
    </Modal>
  );
};
