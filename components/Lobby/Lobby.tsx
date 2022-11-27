import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../SocketContext/socket";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { Player } from "../../shared/types";

interface LobbyProps {
  roomName: string;
  isRoomOwner: boolean;
  players: Player[];
}

export const Lobby = ({ roomName, isRoomOwner, players }: LobbyProps) => {
  const socket = useContext(SocketContext);

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
    socket.on("timer-countdown", (timer: number) => {
      setTimer(timer);
    });

    socket.on("is-timer-paused", (isPaused: boolean) => {
      setIsTimerPaused(isPaused);
    });
  });

  return (
    <div>
      <h1>You have joined room: {roomName}</h1>
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
  );
};
