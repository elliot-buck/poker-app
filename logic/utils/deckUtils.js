export const SUITS = ['C', 'D', 'H', 'S'];

export const RANKS = [
  '2', '3', '4', '5', '6', '7', 
  '8', '9', 'T', 'J', 'Q', 'K', 
  'A'
];

export const HAND_TYPES = {
  HIGH_CARD: 'high-card',
  ONE_PAIR: 'one-pair',
  TWO_PAIR: 'two-pair',
  THREE_OF_A_KIND: 'three-of-kind',
  STRAIGHT: 'straight',
  FLUSH: 'flush',
  FULL_HOUSE: 'full-house',
  FOUR_OF_A_KIND: 'four-of-a-kind',
  STRAIGHT_FLUSH: 'straight-flush',
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index 0..i
    [arr[i], arr[j]] = [arr[j], arr[i]];           // swap
  }
  return arr;
}

export const newDeck = () => {
  const deck = [];

  SUITS.forEach(suit => {
    deck.push(...RANKS.map(value => ( value + suit )));
  })

  return deck;
};

export const newShuffledDeck = () => {
  const deck = newDeck();

  return shuffleArray(deck);
};