import { commitTable, getPlayers, table } from '../state';

/**
 * Deal numberOfCards table cards
 */

export function dealTableCards(numberOfCards) {
  table.dealCards(numberOfCards);
  commitTable();

  return table.deck;
}

/**
 * Deal out all the hole cards, starting from the left of the dealer
 */

export function dealPlayerCards() {
  const players = getPlayers();
  const dealOrder = table.playerOrder;

  dealOrder.forEach(playerID => {
    table.dealToPlayer(players[playerID]);
  });
}