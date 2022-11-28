import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../SocketContext/socket";

import { Player } from "../../shared/types";
import { RenameUser } from "./RenameUser/RenameUser";

interface LobbyProps {
  roomName: string;
  isRoomOwner: boolean;
  players: Player[];
}

export const Lobby = ({ roomName, isRoomOwner, players }: LobbyProps) => {
  const socket = useContext(SocketContext);

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
          <RenameUser username={player.username} />
        ) : (
          <div key="playerSocketId"> {player.username} </div>
        );
      })}
    </div>
  );
};
