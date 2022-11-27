import { Server, Socket } from "socket.io";

import { Room } from "../types/types";
import { roomService } from "../services/roomService";

export function timerHandler(server: Server, socket: Socket, rooms: Room[]) {
  function pauseTimer() {
    const room = roomService.findRoomBySocket(rooms, socket);
    if (room) {
      clearInterval(room.timerId); // Stop decrementing
      server.sockets
        .in(roomService.getRoomId(socket))
        .emit("is-timer-paused", true);
    }
  }

  function resumeTimer() {
    const room = roomService.findRoomBySocket(rooms, socket);
    if (room) {
      startCountdownTimer(server, socket, rooms, room.currentTime); // Resume the timer
      server.sockets
        .in(roomService.getRoomId(socket))
        .emit("is-timer-paused", false);
    }
  }

  function restartTimer() {
    pauseTimer(); // Clean-up intervals
    const room = roomService.findRoomBySocket(rooms, socket);
    if (room) {
      startCountdownTimer(server, socket, rooms, room.duration); // Restart the timer
      server.sockets
        .in(roomService.getRoomId(socket))
        .emit("is-timer-paused", false);
    }
  }

  function stopTimer() {
    pauseTimer(); // Clean-up intervals
    // rooms = roomService.removeRoomBySocket(rooms, socket); // This is if we want to basically disallow this socket to communicate to this room
    server.sockets.in(roomService.getRoomId(socket)).emit("timer-countdown", 0);
  }

  socket.on("pause_timer", pauseTimer);
  socket.on("resume_timer", resumeTimer);
  socket.on("restart_timer", restartTimer);
  socket.on("stop_timer", stopTimer);
}

export function startCountdownTimer(
  server: Server,
  socket: Socket,
  rooms: Room[],
  duration: number
) {
  const room = roomService.findRoomBySocket(rooms, socket);
  if (room) {
    var timerId = setInterval(
      function () {
        // Emit the countdown value to everyone in the room
        server.sockets
          .in(roomService.getRoomId(socket))
          .emit("timer-countdown", duration);

        duration -= 1;
        room.currentTime = duration;
      },
      1000,
      duration
    );
    room.timerId = timerId;
  }
}
