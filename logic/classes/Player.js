export default class Player {
  constructor(name, chips = 0) {
    this.name = name;
    this.chips = chips;
    this.hand = [];
    this.folded = false;
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