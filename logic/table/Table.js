import { getPlayers } from '../state';
import { newShuffledDeck } from "../utils/deckUtils";

export default class Table {
  constructor() {
    this.deck = [];
    this.cards = [];
    this.maxBet = 0;
    this.seats = Array.from({length: 10}, () => null);
    this.dealerPosition;
    this.subPots;
    this.bettingPlayerID;
    this._pot;
    this._dealerID;
    this._playerOrder;
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

  get pot() {
    return [...this.subPots.values()].reduce((partialSum, a) => partialSum + a, 0);
  }

  setPot(key, newValue) {
    this.subPots[key] = newValue;
  }
  
  addToPot(amount) {
    this.subPots.set(this.playerOrder, (this.subPots[this.playerOrder] || 0) + amount);
  }
  
  resetPot() {
    this.subPots = new Map();
  }
  
  getPotValue() {
    return [...this.subPots.values()].reduce((partialSum, a) => partialSum + a, 0);
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
    this.resetPots();
    this.dealerPosition = null;
    this.bettingPlayerID = null;
    this.maxBet = 0;

    return this;
  }

  resetPots() {
    this.subPots = new Map();
  }

  // createPot() {
  //   const players = this.playerOrder;
  //   this.subPots[players] = 0;

  //   this.mainPot = players;
  // }

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

  toSnapshot() {
    return {
      cards: [...this.cards],
      seats: [...this.seats],
      maxBet: this.maxBet, 
      dealerPosition: this.dealerPosition,
      bettingPlayerID: this.bettingPlayerID,
      pot: this.pot,
    };
  }
}