import { getPlayers } from '../state';
import { newShuffledDeck } from "../utils/deckUtils";

export default class Table {
  constructor() {
    this.deck = [];
    this.cards = [];
    this.pot = 0;
    this.maxBet = 0;
    this.seats = Array(10).fill(null);
    this.dealerPosition = 0;
    this._dealerID;
    this._playerOrder = [];
    this.bettingPlayerID;
  }

  /**
   * Getter for dealer - finds the dealer ID based on dealerPosition
   */

  get dealerID() {
    return this.seats[this.dealerPosition];
  }

  /**
   * Getter for playerOrder - Calculates the player order to avoid deprecated state
   */
  
  get playerOrder() {
    const players = getPlayers();

    const playerOrder = [];
  
    const startingSeat = this.dealerPosition; 
    if (startingSeat === -1) throw new Error('Start value not in array');
  
    // Iterate over each seat, starting left (forward) of the dealer
    for (let i = 0; i < this.seats.length; i++) {
      const seatNumber = (startingSeat + i+1) % this.seats.length;
      const playerID = this.seats[seatNumber];
      
      if (playerID && (players[playerID].status != 'folded')) {
        playerOrder.push(playerID);
      }
    }
    
    return playerOrder;
  }

  /**
   * Return the player seated at seat
   * @param {number} seat
   */

  getPlayer(seat) {
    const playerID = this.seats[seat];

    const player = getPlayers()[playerID];

    return player;
  }
  
  seatPlayer(playerID, seat) {
    this.seats[seat] = playerID;
  }

  getPlayerSeat(playerID) {
    return this.seats.indexOf(playerID);
  }

  resetTable() {
    this.deck = newShuffledDeck();
    this.cards = [];
    this.pot = 0;

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

  collectBlind(player, blindAmount) {
    this.pot += player.bet(blindAmount)
  }

  setMaxBet(maxBet) {
    if (maxBet <= this.maxBet) throw new Error(`New max bet must be greater than previous (${maxBet} <= ${this.maxBet})`);

    this.maxBet = maxBet;
  }
}