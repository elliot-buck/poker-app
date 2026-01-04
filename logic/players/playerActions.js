import { Computer, User } from '.';
import { commitTable, getPlayers, setGameState, setPlayers, table } from '../state';
import { raiseMinimumBet } from '../table';
import { ACTIONS, bestHand } from '../utils';

/**
 * Distribute chips evenly between each player and reset their bet
 * 
 * @param {number} chips - Number of chips to give to each player
 * @param {Array} playerIDs - IDs of players to distribute chips to
 */

export function distributeChips(chips, playerIDs) {
  const players = getPlayers();

  playerIDs.forEach((playerID) => {
    const player = players[playerID];

    player.resetBet()
    player.chips += chips;
  });

  table.resetPot();
  commitTable();
}

/**
 * Return an object containing { playerID: best hand } for each player
 * 
 * @param {Array} - Array of players to select from
 * @returns {Object} - { playerID: hand }
 */

export function getPlayerHands(players) {
  return Object.fromEntries(Object.entries(players).map(([playerID, player]) => [
    playerID, 
    bestHand(player.hand)
  ]));
}

/**
 * Returns an array of each winning player's ID
 * 
 * @param {Array} - Array of players to select from
 * @returns {Array} - [playerID]
 */

export function getWinningPlayers(playerHands) {
  let winningPlayers = []
  let highScore = 0;

  Object.entries(playerHands).forEach(([playerID, hand]) => {
    if (hand.score > highScore) {
      // Replace winning player(s) if they have a better hand
      winningPlayers = [playerID];
      highScore = hand.score;
    } else if (hand.score === highScore) {
      // Added to winning player(s) if they have an equal hand
      winningPlayers = [...winningPlayers, playerID];
    }

    // Otherwise, they are ignored
  });

  return winningPlayers;
}

/**
 * Adds a new player to the current game state
 * @param {number} seat
 * @param {string} name
 * @param {number} chips
 */

export function joinPlayer(seat, name, type, chips = 1000) {
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

/**
 * Carry out player action
 * 
 * @param {Player} player - player to apply action
 * @param {string} actionType - type of action (fold/check/call/raise)
 * @param {number} minimumBet - the current bet amount required to stay in
 * @param {number} raiseAmount - (Optional)
 * 
 * @returns {number} - bet amount || 0
 */

export function playerAction(player, actionType, minimumBet, raiseAmount) {
  const amountToCall = minimumBet - player.betAmount;

  switch (actionType) {
    case ACTIONS.FOLD:
      player.fold();
      return 0;
    case ACTIONS.CALL:
      player.bet(amountToCall);
      return amountToCall;
    case ACTIONS.CHECK:
      player.check();
      return 0;
    case ACTIONS.RAISE:
      const betAmount = amountToCall + raiseAmount;
      player.bet(betAmount);
      raiseMinimumBet(player.id, player.betAmount);
      return betAmount;
    default:
      throw new Error(`Action type (${actionType}) must be fold/call/check/raise`);
  }
}

/**
 * Return the function associated with a string
 * 
 * @param {string} stage 
 * @returns {function}
 */

export const getStageFunction = (stage) => {
  const fn = PLAYER_ACTIONS[stage];

  if (!fn) {
    throw new Error(`Unknown stage: ${stage}`);
  }

  return fn;
};