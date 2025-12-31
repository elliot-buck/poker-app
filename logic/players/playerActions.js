import { Computer, User } from '.';
import { getTable, setGameState, setPlayers } from '../state';

/**
 * Adds a new player to the current game state
 * @param {number} seat
 * @param {string} name
 * @param {number} chips
 */

export function joinPlayer(seat, name, type, chips = 1000) {
  const table = getTable();

  const PLAYER_ID = name;
  let newPlayer;
  
  if (type.toLowerCase() == 'user') {
    newPlayer = new User(name, chips);
  } else if (type.toLowerCase() == 'computer') {
    newPlayer = new Computer(name, chips);
  } else {
    throw new Error('Player must be of type "user" or "computer"');
  }

  setPlayers((prev) => {
    prev[PLAYER_ID] = newPlayer;

    return prev;
  });

  table.seatPlayer(PLAYER_ID, seat);

  return newPlayer;
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