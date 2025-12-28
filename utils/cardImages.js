// All card images must be explicitly required for React Native bundler
export const CARD_IMAGES = {
  // Clubs
  '2C': require('../assets/images/cards/2C.svg'),
  '3C': require('../assets/images/cards/3C.svg'),
  '4C': require('../assets/images/cards/4C.svg'),
  '5C': require('../assets/images/cards/5C.svg'),
  '6C': require('../assets/images/cards/6C.svg'),
  '7C': require('../assets/images/cards/7C.svg'),
  '8C': require('../assets/images/cards/8C.svg'),
  '9C': require('../assets/images/cards/9C.svg'),
  'TC': require('../assets/images/cards/TC.svg'),
  'JC': require('../assets/images/cards/JC.svg'),
  'QC': require('../assets/images/cards/QC.svg'),
  'KC': require('../assets/images/cards/KC.svg'),
  'AC': require('../assets/images/cards/AC.svg'),
  // Diamonds
  '2D': require('../assets/images/cards/2D.svg'),
  '3D': require('../assets/images/cards/3D.svg'),
  '4D': require('../assets/images/cards/4D.svg'),
  '5D': require('../assets/images/cards/5D.svg'),
  '6D': require('../assets/images/cards/6D.svg'),
  '7D': require('../assets/images/cards/7D.svg'),
  '8D': require('../assets/images/cards/8D.svg'),
  '9D': require('../assets/images/cards/9D.svg'),
  'TD': require('../assets/images/cards/TD.svg'),
  'JD': require('../assets/images/cards/JD.svg'),
  'QD': require('../assets/images/cards/QD.svg'),
  'KD': require('../assets/images/cards/KD.svg'),
  'AD': require('../assets/images/cards/AD.svg'),
  // Hearts
  '2H': require('../assets/images/cards/2H.svg'),
  '3H': require('../assets/images/cards/3H.svg'),
  '4H': require('../assets/images/cards/4H.svg'),
  '5H': require('../assets/images/cards/5H.svg'),
  '6H': require('../assets/images/cards/6H.svg'),
  '7H': require('../assets/images/cards/7H.svg'),
  '8H': require('../assets/images/cards/8H.svg'),
  '9H': require('../assets/images/cards/9H.svg'),
  'TH': require('../assets/images/cards/TH.svg'),
  'JH': require('../assets/images/cards/JH.svg'),
  'QH': require('../assets/images/cards/QH.svg'),
  'KH': require('../assets/images/cards/KH.svg'),
  'AH': require('../assets/images/cards/AH.svg'),
  // Spades
  '2S': require('../assets/images/cards/2S.svg'),
  '3S': require('../assets/images/cards/3S.svg'),
  '4S': require('../assets/images/cards/4S.svg'),
  '5S': require('../assets/images/cards/5S.svg'),
  '6S': require('../assets/images/cards/6S.svg'),
  '7S': require('../assets/images/cards/7S.svg'),
  '8S': require('../assets/images/cards/8S.svg'),
  '9S': require('../assets/images/cards/9S.svg'),
  'TS': require('../assets/images/cards/TS.svg'),
  'JS': require('../assets/images/cards/JS.svg'),
  'QS': require('../assets/images/cards/QS.svg'),
  'KS': require('../assets/images/cards/KS.svg'),
  'AS': require('../assets/images/cards/AS.svg'),
};

// Helper function to get a card image
export const getCardImage = (cardString) => {
  return CARD_IMAGES[cardString];
};

// Helper function to check if a card exists
export const isValidCard = (cardString) => {
  return cardString in CARD_IMAGES;
};