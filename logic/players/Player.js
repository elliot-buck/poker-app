import { table } from '../state';

export default class Player {
  constructor(name, chips = 0) {
    this._name = name;
    this._id = name;
    this._hand;
    this._seat;

    this.type;
    this.chips = chips;
    this.holeCards = [];
    this.status;
    this.betAmount = 0;
  }

  get seat() {
    return table.getPlayerSeat(this._id);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this._id = value;
  }

  get id() {
    return this._id;
  }

  get hand() {
    return [...this.holeCards, ...table.cards];
  }

  setChips(chips) {
    this.chips = chips;
  }
  
  resetBet() {
    this.betAmount = 0;
  }

  receiveCard(card) {
    this.holeCards.push(card);
  }

  resetHand() {
    this.holeCards = [];
    this.status = 'pending';
    this.betAmount = 0;
  }

  resetStatus() {
    this.setStatus(Player.STATUS.PENDING);
  }

  setStatus(newStatus) {
    this.status = newStatus;
  }

  action(minBet) {}

  /**
   * Apply action
   */

  check() {
    return Player.STATUS.IN;
  }

  bet(amount) {
    let betAmount = amount;

    if (betAmount > this.chips) {
      betAmount = this.chips;
      this.setStatus(Player.STATUS.ALL_IN);
    } else {
      this.setStatus(Player.STATUS.IN);
    }
    
    this.chips -= betAmount;
    this.betAmount += betAmount;
    
    return betAmount;
  }

  fold() {
    this.setStatus(Player.STATUS.FOLDED);
  }

  isAllIn() {
    return (this.status === Player.STATUS.ALL_IN);
  }

  static TYPES = {
    USER: 'USER',
    COMPUTER: 'COMPUTER',
  };

  static STATUS = {
    PENDING: 'pending',
    FOLDED: 'folded',
    IN: 'in',
    ALL_IN: 'all-in',
  }
}