import { newShuffledDeck } from "../utils/deckUtils";

export default class Table {
  constructor() {
    this.deck = [];
    this.cards = [];
    this.pot = 0;
  }

  resetTable() {
    this.deck = newShuffledDeck();
    this.cards = [];
    this.pot = 0

    return this;
  }

  dealCards(numberOfCards) {
    // Repeat for each card
    for (let i = 0; i < numberOfCards; i++) {
      const newCard = this.deck.pop() // Remove card from the top of the deck
      
      this.cards.push(newCard) // Add the removed card to the table
    }

    return this.cards;
  }

  dealToPlayer(player) {
    for (let i = 0; i < 2; i++) {
      const newCard = this.deck.pop() // Remove card from the top of the deck
      
      player.receiveCard(newCard) // Add the removed card to the player's hand
    }
  }
}