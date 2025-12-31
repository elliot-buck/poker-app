import { nextPlayer } from '.';
import { Player } from '../players';
import { getGameState, getPlayers, getSettings, getTable, setTable } from '../state';
import { waitForUserAction } from '../utils';

function nextTick() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Set the betting player to the next player in rotation
 */

export function nextBet() {
  const bettingPlayerID = getTable().bettingPlayerID;

  const next = nextPlayer(bettingPlayerID)

  setBettingPlayer(next);

  return next;
}

// Collect each player's status

export function playerStatuses() {
  const players = getPlayers();
  const betOrder = getTable().playerOrder;

  console.log('bot1', players['bot1'].status);

  return betOrder.map((playerID) => (players[playerID].status));
}

export const bettingRound = async () => {
  const { players, table } = getGameState();
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

    console.log('Betting player:', table.bettingPlayerID);
    
    // If the betting player is the user, await user action
    // Else, collect the computer response

    if (bettingPlayer.type == Player.TYPES.USER) {
      console.log('waiting for user action');
      await nextTick();
      action = await waitForUserAction();
      console.log('User action:', action);
    } else if (bettingPlayer.type == Player.TYPES.COMPUTER) {
      action = bettingPlayer.action();
    } else {
      throw new Error('Player must be of type USER or COMPUTER');
    }

    applyAction(bettingPlayer, action, table.maxBet);
    console.log('After bet:', playerStatuses());

    nextBet();
  }

  return true;
};

/**
 * Apply a user action (bet, fold ...)
 */

export function applyAction(player, actionObject, currentMinimumBet) {
  const { type, amount } = actionObject;
  const table = getTable();

  const amountToCall = currentMinimumBet - player.betAmount;
  console.log(type.toLowerCase());

  // Apply action based on type
  switch (type.toLowerCase()) {
    case 'fold':
      player.fold();
      break;
    case 'call':
      player.bet(amountToCall);
      table.pot += amountToCall;
      break;
    case 'check':
      player.check();
      break;
    case 'raise':
      const betAmount = amountToCall + amount;
      player.bet(betAmount);
      table.pot += betAmount;
      raiseMinimumBet(player.id, player.betAmount);
      break;
    default:
      throw new Error(`Action type (${type}) must be fold/call/check/raise`);
  }
}

/**
 * Update players when minimum bet is raised
 */

export function raiseMinimumBet(bettingPlayerID, amount) {
  const table = getTable();
  const players = getPlayers();

  table.setMaxBet(amount);

  for (const [playerID, player] of Object.entries(players)) {
    if (playerID != bettingPlayerID) {
      player.resetStatus()
    }
  }
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

  const { table, players } = getGameState();
  const playerOrder = table.playerOrder;

  const bigBlindPlayer = players[playerOrder[0]];
  const smallBlindPlayer = players[playerOrder[1]];

  table.collectBlind(bigBlindPlayer, BIG_BLIND);
  table.collectBlind(smallBlindPlayer, SMALL_BLIND);

  table.maxBet = BIG_BLIND;

  return table.pot;
}

/**
 * Set the betting player to the player with id playerID
 */

export function setBettingPlayer(playerID) {
  setTable((prev) => {
    prev.bettingPlayerID = playerID;
    return prev;
  });
}