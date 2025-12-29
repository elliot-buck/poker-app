import { Player, initialGameState } from '.';
import { setGameSettings } from '../contexts/GameSettings';
import { getGameState, setGameState } from '../contexts/GameState';

/**
 * Adds a new player to the current game state
 * @param {number} position
 * @param {string} name
 * @param {number} chips
 */

export function joinPlayer(position, name, chips = 1000) {
  const newPlayer = new Player(name, chips);

  setGameState((prev) => {
    prev.players[position] = newPlayer;
    prev.positions.push(position);
    return prev;
  });

  return newPlayer;
}

/**
 * Set 'userPosition' attribute in the game state to userPosition
 */

export function setUser(userPosition) {
  setGameState((prev) => ({
    ...prev,
    userPosition: userPosition,
    user: prev.players[userPosition],
  }));
}

/**
 * Initialises a new game
 */

export function newGame() {
  setGameState(initialGameState);

  return initialGameState;
}

/**
 * Update game settings
 */

export function updateSettings(difficulty, turnLength, equityDisplay, helpDisplay, bigBlind) {
  setGameSettings(initialGameState);

  setGameSettings({
    difficulty: difficulty,
    turnLength: turnLength,
    equityDisplay: equityDisplay,
    helpDisplay: helpDisplay,
    bigBlind: bigBlind
  });

  return initialGameState;
}

/**
 * Set stage to newStage
 */

export function setStage(newStage) {
  setGameState((prev) => ({
    ...prev,
    stage: newStage,
  }));

  return newStage
}

/**
 * Create a new shuffled deck for the table
 * Remove all table cards
 * Empty the pot
 */

export function resetTable() {
  const table = getGameState().table;

  table.resetTable();

  return table;
}

/**
 * Deal numberOfCards table cards
 */

export function dealTableCards(numberOfCards) {
  const table = getGameState().table;

  table.dealCards(numberOfCards);

  return table.deck;
}

/**
 * Deal out all the hole cards, starting from the left of the dealer
 */

export function dealPlayerCards() {
  const { table, players, positions, dealer } = getGameState();

  console.log(table, players, positions, dealer)

  // Find index of the dealer in the positions array
  const startIndex = positions.indexOf(dealer); 
  if (startIndex === -1) throw new Error('Start value not in array');

  // Iterate over each seated position, starting left of the dealer
  for (let i = 0; i < positions.length; i++) {
    const position = positions[(startIndex + i+1) % positions.length];
    const player = players[position]

    table.dealToPlayer(player);
  }
}