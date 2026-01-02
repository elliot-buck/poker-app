import { getTable } from '../state';

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
    return getTable().getPlayerSeat(this._id);
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
    return [...this.holeCards, ...getTable().cards];
  }

  setChips(chips) {
    this.chips = chips;
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
    this.setStatus('pending');
  }

  setStatus(newStatus) {
    this.status = newStatus;
  }

  action(minBet) {}

  /**
   * Apply action
   */

  check() {

  }

  bet(amount) {
    if (amount > this.chips) throw new Error('Not enough chips');
    this.chips -= amount;
    this.betAmount += amount;
    this.setStatus('in');
    return amount;
  }

  fold() {
    this.setStatus('folded');
  }

  static TYPES = {
    USER: 'USER',
    COMPUTER: 'COMPUTER',
  };
}