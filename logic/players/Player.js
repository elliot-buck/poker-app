export default class Player {
  constructor(name, chips = 0) {
    this._name = name;
    this._id = name;
    this.chips = chips;
    this.hand = [];
    this.folded = false;
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

  setChips(chips) {
    this.chips = chips;
  }

  bet(amount) {
    if (amount > this.chips) throw new Error('Not enough chips');
    this.chips -= amount;
    return amount;
  }

  receiveCard(card) {
    this.hand.push(card);
  }

  resetHand() {
    this.hand = [];
    this.folded = false;
  }
}