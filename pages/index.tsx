// SOURCE: https://github.com/machadop1407/socket-io-react-example/
import { useEffect, useState, useContext } from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SocketContext } from "../components/SocketContext/socket";

import { Player } from "../shared/types";
import { LandingPage } from "../components/LandingPage/LandingPage";
// import { Lobby } from "../components/Lobby/Lobby";

function getRoomIdFromString(message: string): string {
  let roomId = message.match(/'(.*?)'/g);
  if (roomId) {
    return roomId[0].replace(/'/g, "");
  } else {
    return "";
  }
}

export default function Home() {
  // Socket
  const socket = useContext(SocketContext);

  //Room State
  const [room, setRoom] = useState<string>("");
  const [isInRoom, setIsInRoom] = useState<boolean>(false);
  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);

  // Modal states
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      username: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  // Timer
  const [timer, setTimer] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  if (timer < 0) {
    socket.emit("stop_timer");
  }

  // Socket responses
  const pauseTimer = () => {
    socket.emit("pause_timer");
  };
  const resumeTimer = () => {
    socket.emit("resume_timer");
  };
  const restartTimer = () => {
    socket.emit("restart_timer");
  };
  const stopTimer = () => {
    if (isRoomOwner) {
      socket.emit("stop_timer");
    } else {
      alert("You don't have permission to do that!");
    }
  };

  useEffect(() => {
    socket.on("create-room-msg", (message: string) => {
      setRoom(getRoomIdFromString(message));
      setIsInRoom(true);
      setIsRoomOwner(true);
    });

    socket.on("join-room-msg", (message: string) => {
      setRoom(getRoomIdFromString(message));
      setIsInRoom(true);
    });

    socket.on("timer-countdown", (timer: number) => {
      setTimer(timer);
    });

    socket.on("is-timer-paused", (isPaused: boolean) => {
      setIsTimerPaused(isPaused);
    });

    socket.on("players-in-room", (players: Player[]) => {
      setPlayers(players);
    });
  });

  return isInRoom ? (
    <div>
      <h1>You have joined room: {room}</h1>
      <div> {timer.toPrecision(4)} </div>
      {isTimerPaused && <button onClick={resumeTimer}> Resume timer</button>}
      {!isTimerPaused && <button onClick={pauseTimer}> Pause timer</button>}
      <button onClick={restartTimer}> Restart timer</button>
      <button onClick={stopTimer}> Stop timer</button>
      {players.map((player: Player) => {
        return socket.id === player.playerSocketId ? (
          <div>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Introduce yourself!"
            >
              <form
                onSubmit={form.onSubmit((values) => {
                  socket.emit("set_username", values.username);
                  setOpened(false);
                })}
              >
                <TextInput
                  withAsterisk
                  label="Enter your username!"
                  placeholder="Username"
                  data-autoFocus
                  {...form.getInputProps("username")}
                />
                <Group position="right" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </Modal>
            <Button onClick={() => setOpened(true)}>Open Modal</Button>
            <h2 key="playerSocketId"> {player.username} </h2>
          </div>
        ) : (
          <div key="playerSocketId"> {player.username} </div>
        );
      })}
    </div>
  ) : (
    <LandingPage />
  );
}
