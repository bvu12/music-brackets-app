import { Player } from "../../shared/types";
import { LinkedList } from "../types/types";

export module playerService {
  export function createOwner(adminId: string): Player {
    return createPlayer(adminId, "Player 1");
  }

  export function createPlayer(playerId: string, username: string): Player {
    const player = new Player(playerId, username);

    return player;
  }

  export function createOriginalPlayerListWithAdmin(
    admin: Player
  ): LinkedList<Player> {
    let listOfPlayers = new LinkedList<Player>();
    listOfPlayers.append(admin);

    return listOfPlayers;
  }

  export function getNextUsername(players: LinkedList<Player>): string {
    const len = players.size;
    return "Player " + (len + 1).toString();
  }
}
