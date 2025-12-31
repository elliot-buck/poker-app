import { getTable } from '../state';

/**
 * Create a new shuffled deck for the table
 * Remove all table cards
 * Empty the pot
 */

export function resetTable() {
  const table = getTable();

  table.resetTable();

  return table;
}

/**
 * Return the next player in rotation
 */

export function nextPlayer(previousPlayer) {
  const playerOrder = getTable().playerOrder;

  // Get the index of the player's ID in the player order array
  let playerPositionIndex = playerOrder.indexOf(previousPlayer);

  // Incriment through the player order array, looping at the end
  playerPositionIndex = (playerPositionIndex+1) % playerOrder.length;
  let nextPlayerID = playerOrder[playerPositionIndex];

  return nextPlayerID;
}