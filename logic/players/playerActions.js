import { Computer, User } from '.';
import { getTable, setGameState, setPlayers } from '../state';
import { bestHand } from '../utils';

/**
 * Distribute chips evenly between each player (each player can recieve at max what they )
 */

/**
 * Returns a dictionary of playerIDs and hands from each winning player
 * 
 * @param {Array} - Array of players to select from
 * @returns {Object} - { playerID: hand }
 */

export function getWinningPlayers(players) {

  let winningPlayers = {}
  let highScore = 0;

  Object.entries(players).forEach(([playerID, player]) => {
    const hand = bestHand(player.hand);
    console.log(hand);
    
    if (hand.score > highScore) {
      // Replace winning player(s) if they have a better hand
      winningPlayers = {[playerID]: hand};
      highScore = hand.score;
    } else if (hand.score === highScore) {
      // Added to winning player(s) if they have an equal hand
      winningPlayers = {...winningPlayers, [playerID]: hand };
    }

    // Otherwise, they are ignored
  });

  console.log(winningPlayers);

  return winningPlayers;
}

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