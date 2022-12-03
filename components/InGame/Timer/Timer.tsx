import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../SocketContext/socket";

interface TimerProps {
  isRoomOwner: boolean;
}

export const Timer = ({ isRoomOwner }: TimerProps) => {
  const socket = useContext(SocketContext);

  // Timer
  const [timer, setTimer] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Timer logic
  if (timer < 0) {
    socket.emit("stop_timer");
  }

  // Client actions
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

  // Server responses
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
      {timer.toPrecision(4)}
      {isTimerPaused && <button onClick={resumeTimer}> Resume timer</button>}
      {!isTimerPaused && <button onClick={pauseTimer}> Pause timer</button>}
      <button onClick={restartTimer}> Restart timer</button>
      <button onClick={stopTimer}> Stop timer</button>
    </div>
  );
};
