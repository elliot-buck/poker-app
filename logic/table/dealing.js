import { seat } from '../players';
import { getGameState, getTable } from '../state';

/**
 * Deal numberOfCards table cards
 */

export function dealTableCards(numberOfCards) {
  const table = getTable();

  table.dealCards(numberOfCards);

  return table.deck;
}

/**
 * Deal out all the hole cards, starting from the left of the dealer
 */

export function dealPlayerCards() {
  const { table, players, seats, dealer } = getGameState();

  // Find index of the dealer in the seats array
  const startingSeat = seat(dealer); 
  if (startingSeat === -1) throw new Error('Start value not in array');

  // Iterate over each seat, starting left (forward) of the dealer
  for (let i = 0; i < seats.length; i++) {
    const seat = seats[(startingSeat + i+1) % seats.length];

    if (seat) {
      const player = players[seat]
  
      table.dealToPlayer(player);
    }
  }
}