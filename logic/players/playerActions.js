import { Player } from '.';
import { getGameState, setGameState, setPlayers } from '../state';

/**
 * Adds a new player to the current game state
 * @param {number} seat
 * @param {string} name
 * @param {number} chips
 */

export function joinPlayer(seat, name, chips = 1000) {
  const PLAYER_ID = name;
  
  const newPlayer = new Player(name, chips);

  setPlayers((prev) => {
    prev[PLAYER_ID] = newPlayer;
    return prev;
  });

  setGameState((prev) => {
    prev.seats[seat] = PLAYER_ID;
    return prev
  });

  return newPlayer;
}

/**
 * Get the seat of player
 * 
 * @param {Player} player
 */

export function seat(player) {
  const seats = getGameState().seats;

  console.log(player, player.id, seats);

  return seats.indexOf(player.id);
}

/**
 * Set 'user' attribute in the game state to the player with id userID
 */

export function setUser(playerID) {
  setGameState((prev) => ({
    ...prev,
    user: prev.players[playerID],
  }));
}

/**
 * Set 'dealer' attribute in the game state to the player with id playerID
 */

export function setDealer(playerID) {
  setGameState((prev) => ({
    ...prev,
    dealer: prev.players[playerID],
  }));
}