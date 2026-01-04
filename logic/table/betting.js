import { nextPlayer } from '.';
import { Player, playerAction } from '../players';
import { commitTable, getPlayers, getSettings, refreshPlayers, table } from '../state';
import { ACTIONS, waitForUserAction } from '../utils';

/**
 * Wait for UI elements to load
 */

function nextTick() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Set the betting player to the next player in rotation
 */

export function nextBet() {
  const bettingPlayerID = table.bettingPlayerID;

  const next = nextPlayer(bettingPlayerID)

  setBettingPlayer(next);

  return next;
}

// Collect each player's status

export function playerStatuses() {
  const players = getPlayers();
  const betOrder = table.playerOrder;

  return betOrder.map((playerID) => (players[playerID].status));
}

// Run a round of betting

export const bettingRound = async () => {
  const players = getPlayers();
  const { playerOrder: betOrder } = table;

  // Reset each player's status to 'pending'
  betOrder.forEach(playerID => {
    players[playerID].resetStatus();
  });

  setBettingPlayer(betOrder[0]);

  // End loop when no player is pending
  while (playerStatuses().includes('pending')) {
    let action;
    
    const bettingPlayer = players[table.bettingPlayerID];
    
    // If the betting player is the user, await user action
    // Else, collect the computer response

    if (bettingPlayer.type == Player.TYPES.USER) {
      await nextTick();
      action = await waitForUserAction();
    } else if (bettingPlayer.type == Player.TYPES.COMPUTER) {
      action = bettingPlayer.action();
    } else {
      throw new Error('Player must be of type USER or COMPUTER');
    }

    applyAction(bettingPlayer, action, table.maxBet);
    refreshPlayers();
    commitTable();

    // Break and return the winning player if there's only one player left
    const winningPlayer = checkForWin();

    // Return if winning player is not null
    if (winningPlayer) return [winningPlayer];

    nextBet();
  }

  return null;
};

/**
 * Apply a user action (bet, fold ...)
 */

export function applyAction(player, actionObject, minimumBet) {
  const { type, amount } = actionObject;

  // Apply action based on type
  const betAmount = playerAction(player, type, minimumBet, amount);

  if (betAmount > 0) table.addToPot(betAmount);
}

/**
 * Update players when minimum bet is raised
 */

export function raiseMinimumBet(bettingPlayerID, amount) {
  const players = getPlayers();

  table.setMaxBet(amount);

  for (const [playerID, player] of Object.entries(players)) {
    if (playerID != bettingPlayerID) {
      player.resetStatus();
    }
  }
}

/**
 * Check if a player has won, if so return the winning player
 * 
 * @returns {Player | null}
 */

export function checkForWin() {
  // Retrieve player order
  const playerOrder = table.playerOrder || 0;

  // Length 1 means that player has won
  if (playerOrder.length === 1) {
    return playerOrder[0];
  }

  return null;
}

/**
 * Return object containing big and small blind amounts
 */

export function getBlinds() {
  const bigBlind = getSettings().bigBlind;

  const smallBlind = bigBlind / 2;

  return {
    BIG_BLIND: bigBlind,
    SMALL_BLIND: smallBlind
  }
}

/**
 * Assigns and collects big and small blind from the appropriate players
 */

export function setBlinds() {
  const { BIG_BLIND, SMALL_BLIND } = getBlinds();

  const players = getPlayers();
  const playerOrder = table.playerOrder;

  const smallBlindPlayer = players[playerOrder[1]];
  const bigBlindPlayer = players[playerOrder[0]];

  table.addToPot(playerAction(smallBlindPlayer, ACTIONS.RAISE, 0, SMALL_BLIND));
  table.addToPot(playerAction(bigBlindPlayer, ACTIONS.RAISE, 25, BIG_BLIND-SMALL_BLIND));

  return table.pot;
}

/**
 * Set the betting player to the player with id playerID
 */

export function setBettingPlayer(playerID) {
  table.bettingPlayerID = playerID;
  return table.bettingPlayerID
}