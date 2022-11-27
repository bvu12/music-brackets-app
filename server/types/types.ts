import { Player } from "../../shared/types";

// SOURCE: https://github.com/sdclarkelab/socket.io-countdown-timer
export interface Room {
  roomId: string;
  duration: number;
  timerId: number | undefined;
  currentTime: number;
  isRunning: boolean;
  players: Player[];
}
