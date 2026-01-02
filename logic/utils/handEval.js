import { containsSubarray, HAND_TYPES, longestCommonSubarray, RANKS, SUITS } from '.';

const RANK_VALUES = Object.fromEntries(
  RANKS.map((rank, index) => [rank, index])
);

const SUIT_VALUES = Object.fromEntries(
  SUITS.map((suit, index) => [suit, index])
);

const HAND_VALUES = Object.fromEntries(
  Object.values(HAND_TYPES).map((handType, index) => [handType, index])
);

const SET_NAME_BY_SIGNATURE = {
  '4': HAND_TYPES.FOUR_OF_A_KIND,
  '4,3': HAND_TYPES.FOUR_OF_A_KIND,
  '3,3': HAND_TYPES.FULL_HOUSE,
  '3,2': HAND_TYPES.FULL_HOUSE,
  '3': HAND_TYPES.THREE_OF_A_KIND,
  '2,2': HAND_TYPES.TWO_PAIR,
  '2': HAND_TYPES.ONE_PAIR,
  '': HAND_TYPES.HIGH_CARD,
};

/**
 * Returns the type and cards of the best possible hand 
 * 
 * @param {Array} hand - Hand to evaluate
 * @returns {Object} - { type, hand }
 */

export function bestHand(hand) {
  const ranks = hand.map(card => card[0]);
  const suits = hand.map(card => card[1]);

  // Check for flush/straight flush and straight
  // If a hand contains a flush, it can't also contain a four of a kind / full house
  // Therefore the algorithm can safely return the flush/straight flush as the best hand

  const flushSuit = flush(suits);
  const straightRanks = straight(ranks);

  if (flushSuit && straightRanks) return returnHand(
    HAND_TYPES.STRAIGHT_FLUSH, 
    bestFilteredHand(hand, 5, (card) => (
      straightRanks.includes(card[0])
      && (card[1] === flushSuit)
    ))
  )

  if (flushSuit) return returnHand(
    HAND_TYPES.FLUSH,
    bestFilteredHand(hand, 5, (card) => (card[1] === flushSuit))
  )

  if (straightRanks) {
    const bestHand = bestFilteredHand(hand, 5, (card) => straightRanks.includes(card[0]));

    if (bestHand[0][0] === 'A') {
      bestHand.push(bestHand.shift());
    }

    return returnHand(
      HAND_TYPES.STRAIGHT,
      bestHand,
    );
  }

  const { type, set } = bestSet(ranks);

  // Get the best cards that are in a set, and ensure a hand of 5 is made with the best remaining cards
  // This guarantees the best hand is made
  const bestSetCards = bestFilteredHand(hand, 5, (card) => set.includes(card[0]));
  const bestRemainingCards = bestFilteredHand(hand, 5 - bestSetCards.length, (card) => !set.includes(card[0]));

  return returnHand(
    type,
    [...bestSetCards, ...bestRemainingCards],
  );
}

/**
 * Returns a numerical score so that hands can be compared
 * 
 * @param {String} type - Hand type string
 * @param {Array} hand - Cards array
 * @returns {number} - Hand score
 */

export function handScore(type, hand) {
  let score = HAND_VALUES[type];

  for (const [rank] of hand) {
    score = score * 13 + RANK_VALUES[rank];
  }

  return score;
}

/**
 * Returns an object containing the hand type, hand and score
 * 
 * @param {string} type - Hand type
 * @param {Array} hand - Hand to return
 * @returns {Object} - { type, hand, score }
 */

export function returnHand(type, hand) {
  return {
    type: type,
    hand: hand,
    score: handScore(type, hand),
  }
}

/**
 * Returns the best set from a hand
 * 
 * @param {Array} handRanks - Array of 5 card strings
 * 
 * @returns {Object | null} - { type, set }
 */

export function bestSet(handRanks) {
  const rankCountDict = rankCounts(handRanks);
  let orderedRankCounts = Object.entries(rankCountDict).sort((a, b) => b[1] - a[1]);
  const largestSet = orderedRankCounts[0][1];

  // Get the largest two sets from the hand
  const bestSets = orderedRankCounts.filter(rankCount => (
    (largestSet - rankCount[1]) <= 1
    && (rankCount[1] >= 2)
  ));

  const orderedBestSets = [...bestSets].sort((a, b) => {
    return RANK_VALUES[b[0]] - RANK_VALUES[a[0]]; 
  }).slice(0, 2);

  // Destructure best sets to the set ranks and set signature
  const setRanks = orderedBestSets.map(([rank]) => rank);
  const setSignature = orderedBestSets.map(([, count]) => count); 

  // Return the name and ranks of the set
  return {
    type: getSetName(setSignature),
    set: setRanks
  };
}

function normalizeSetSignature(sets) {
  return sets.slice().sort((a, b) => b - a);
}

function getSetName(setSignature) {
  const key = normalizeSetSignature(setSignature).join(',');
  return SET_NAME_BY_SIGNATURE[key] ?? 'Unknown';
}


/**
 * Returns the number of duplicates for each card in a hand
 * 
 * @param {Array} handRanks - Array of 5 card strings
 * 
 * @returns {Array | null}
 */

export function rankCounts(handRanks) {
  const counts = {};
  for (const rank of handRanks) {
    counts[rank] = (counts[rank] || 0) + 1;
  }

  return counts;
}

/**
 * Returns values of the flush suit if the hand contains a flush (otherwise returns null)
 * 
 * @param {Array} handSuits - Array of 5-7 suit strings
 * 
 * @returns {string | null}
 */

export function flush(handSuits) {
  const suitCounts = {}

  for (const suit of handSuits) {
    suitCounts[suit] = (suitCounts[suit] || 0) + 1;

    if (suitCounts[suit] >= 5) {
      return suit;
    }; // found flush
  }

  return null;
}

/**
 * Returns consecutive values if the hand contains a straight (otherwise returns null)
 * 
 * @param {Array} handRanks - Array of 5-7 rank strings
 * 
 * @returns {Array | null}
 */

export function straight(handRanks) {
  const sortedHand = sortRanks(handRanks);

  const longestStraight = longestCommonSubarray(RANKS, sortedHand)

  if (longestStraight.length >= 5 ){
    return longestStraight.slice(-5);
  }

  if (sortedHand.includes('A') && containsSubarray(sortedHand, ['2', '3', '4', '5'])) {
    return (['A', '2', '3', '4', '5']);
  }

  return null;
}

/**
 * Returns the best 5-card hand based on a filter condition
 * 
 * @param {Array} hand - Hand to filter
 * @param {function} condition - Condition to filter based on
 * 
 */

/**
 * Return the best (maxCards) cards of a hand which satisfy a condition
 * 
 * @param {Array} hand - Hand to filter
 * @param {number} maxCards - Maximum cards to return
 * @param {function} condition - Condition to filter by
 * @returns {Array}
 */

export function bestFilteredHand(hand, maxCards, condition=(() => true)) {
  const filteredHand = hand.filter(condition);

  return bestCards(filteredHand, maxCards);
}

/**
 * Returns the best n <= maxCards cards, sorted by rank first then suit (descending)
 * 
 * @param {Array} cards - List of cards to reduce
 * @param {number} maxCards - Maximum cards to return
 * @returns {Array}
 */

function bestCards(cards, maxCards) {
  // Sort by rank first, then suit
  const sorted = [...cards].sort((a, b) => {
    const rankDiff = RANK_VALUES[b[0]] - RANK_VALUES[a[0]];
    if (rankDiff !== 0) return rankDiff;
    return SUIT_VALUES[b[1]] - SUIT_VALUES[a[1]];
  });

  // Take the first n=maxCards (highest) cards
  return sorted.slice(0, Math.min(sorted.length, maxCards));
}

/**
 * Sorts card ranks
 * 
 * @param {Array} cardRanks - List of cards to be sorted
 * @param {number} direction - Direction to sort in, default 1=ascending
 * @returns {Array} - Sorted card list
 */

function sortRanks(cardRanks, ascending=1) {
  const sorted = [...cardRanks].sort((a, b) => {
    return RANK_VALUES[a]*ascending - RANK_VALUES[b]*ascending; 
  });

  return sorted;
}

/**
 * Sorts cards by suit (ascending)
 * 
 * @param {Array} cards - List of cards to be sorted
 * @returns {Array} - Sorted card list
 */

function sortBySuit(cards) {
  const sorted = [...cards].sort((a, b) => {
    return SUIT_VALUES[a[0]] - SUIT_VALUES[b[0]]; 
  });

  return sorted;
}