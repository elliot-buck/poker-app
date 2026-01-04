import { distributeChips, getWinningPlayers } from '../players';
import { commitTable, refreshPlayers, table } from '../state';

/**
 * Distribute pots
 */

export function distributePots(playerHands) {
  table.subPots.entries().forEach(([contributors, amount]) => {
    
    const potPlayerHands = Object.fromEntries(
      contributors.map(contributor => [
        contributor, playerHands[contributor]
      ])
    );

    const winningPlayers = getWinningPlayers(potPlayerHands);

    distributeChips(amount / winningPlayers.length, winningPlayers);

    table.setPot(contributors, 0);
  });

  refreshPlayers();
  commitTable();
}

/**
 * Create a new shuffled deck for the table
 * Remove all table cards
 * Empty the pot
 */

export function resetTable() {
  table.resetTable();
  table.addToPot(0);

  commitTable();

  return table;
}

/**
 * Return the next player in rotation
 */

export function nextPlayer(previousPlayer) {
  const playerOrder = table.playerOrder;

  // Get the index of the player's ID in the player order array
  let playerPositionIndex = playerOrder.indexOf(previousPlayer);

  // Incriment through the player order array, looping at the end
  playerPositionIndex = (playerPositionIndex+1) % playerOrder.length;
  let nextPlayerID = playerOrder[playerPositionIndex];

  return nextPlayerID;
}