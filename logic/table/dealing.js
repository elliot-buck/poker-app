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
  const { table, players } = getGameState();
  const dealOrder = table.playerOrder;

  dealOrder.forEach(playerID => {
    table.dealToPlayer(players[playerID]);
  });
}