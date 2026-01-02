import { describe, expect, test } from 'vitest';
import { bestFilteredHand, bestHand, flush, handScore, rankCounts, straight } from '.';

describe('hand score', () => {
  test('ace high', () => {
    const hand = ['AS', 'KC', 'TH', '8H', '2D'];
    expect(handScore('high-card', hand)).toBe(12 * (13**4) + 11 * (13**3) + 8 * (13**2) + 6 * 13 + 0);
  });

  test('two pair beats pair', () => {
    const twoPair = ['AS', 'AC', '7H', '7D', '2D', '2S', '4S'];
    const onePair = ['AS', 'AC', 'TH', '8H', '2D', '3S', '4S'];
    expect((handScore('two-pair', twoPair) > handScore('one-pair', onePair))).toBe(true);
  });
});

describe('best hand', () => {
  test('high card', () => {
    const hand = ['AS', 'KC', 'TH', '8H', '2D'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'high-card',
      hand: ['AS', 'KC', 'TH', '8H', '2D']
    });
  });

  test('one pair', () => {
    const hand = ['AS', 'AC', 'TH', '8H', '2D', '3S', '4S'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'one-pair',
      hand: ['AS', 'AC', 'TH', '8H', '4S']
    });
  });

  test('two pair', () => {
    const hand = ['AS', 'AC', '7H', '7D', '2D', '2S', '4S'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'two-pair',
      hand: ['AS', 'AC', '7H', '7D', '4S']
    });
  });

  test('three of a kind', () => {
    const hand = ['AS', 'AC', 'AH', '7D', '2D', '3S', '4S'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'three-of-a-kind',
      hand: ['AS', 'AH', 'AC', '7D', '4S']
    });
  });

  test ('straight', () => {
    const hand = ['AC', '5S', '2H', '2S', '4D', '3D', 'KS'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'straight',
      hand: ['5S', '4D', '3D', '2S', 'AC']
    });
  });

  test ('flush', () => {
    const hand = ['2C', 'AC', 'KC', 'TC', '4S', 'AS', '3C'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'flush',
      hand: ['AC', 'KC', 'TC', '3C', '2C']
    });
  });

  test('full house', () => {
    const hand = ['AS', 'AC', 'AH', '7D', '7H', '7S', 'TS'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'full-house',
      hand: ['AS', 'AH', 'AC', '7S', '7H']
    });
  });

  test('four of a kind', () => {
    const hand = ['2S', '2C', '2H', '2D', '7D', '7S', '4S'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'four-of-a-kind',
      hand: ['2S', '2H', '2D', '2C', '7S']
    });
  });

  test('straight flush', () => {
    const hand = ['3C', '4S', '4C', '5C', '6C', '7C', '8C'];
    expect(bestHand(hand)).toStrictEqual({
      type: 'straight-flush',
      hand: ['8C', '7C', '6C', '5C', '4C']
    });
  });
});

describe('best filtered hand', () => {
  const straight = ['4', '5', '6', '7', '8'];
  const flushSuit = 'C';

  test ('straight', () => {
    const hand = ['3C', '4H', '4S', '5D', '6D', '7S', '8S'];
    expect(bestFilteredHand(hand, 5, (card) => straight.includes(card[0]))).toStrictEqual(
      ['4S', '5D', '6D', '7S', '8S'].reverse()
    );
  });

  test ('flush', () => {
    const hand = ['2C', 'AC', 'KC', 'TC', '4C', 'AS', '3C'];
    expect(bestFilteredHand(hand, 5, (card) => (card[1] === flushSuit))).toStrictEqual(
      ['3C', '4C', 'TC', 'KC', 'AC'].reverse()
    );
  });

  test ('straight flush', () => {
    const hand = ['3C', '4S', '4C', '5C', '6C', '7C', '8C'];
    expect(bestFilteredHand(
      hand,
      5, 
      (card) => straight.includes(card[0]) && (card[1] === flushSuit)
    )).toStrictEqual(
      ['4C', '5C', '6C', '7C', '8C'].reverse()
    );
  });
});

describe('check for straight', () => {
  test ('no straight', () => {
    const hand = ['9', 'T', 'J', 'Q', '2', '3', '4'];
    expect(straight(hand)).toBe(null);
  });

  test ('straight', () => {
    const hand = ['A', '2', '4', '5', '3', 'T', 'J'];
    expect(straight(hand)).toStrictEqual([
      'A', '2', '3', '4', '5'
    ]);
  });

  test ('straight', () => {
    const hand = ['A', '2', '4', '5', '3', 'T', '6'];
    expect(straight(hand)).toStrictEqual([
      '2', '3', '4', '5', '6'
    ]);
  });
});

describe('check for flush', () => {
  test ('no flush', () => {
    const hand = ['S', 'S', 'S', 'S', 'D', 'D', 'D'];
    expect(flush(hand)).toBe(null);
  });

  test ('flush', () => {
    const hand = ['S', 'S', 'S', 'D', 'D', 'S', 'S'];
    expect(flush(hand)).toBe('S');
  });
});

describe('rank counts', () => {
  test('high card', () => {
    const hand = ['A', 'K', '7', '5', '2', '3', '4'];
    expect(rankCounts(hand)).toStrictEqual({
      'A': 1,
      'K': 1,
      '7': 1,
      '5': 1,
      '2': 1,
      '3': 1,
      '4': 1,
    });
  });

  test('one pair', () => {
    const hand = ['A', 'A', '7', '5', '2', '3', '4'];
    expect(rankCounts(hand)).toStrictEqual({
      'A': 2,
      '7': 1,
      '5': 1,
      '2': 1,
      '3': 1,
      '4': 1,
    });
  });

  test('two pair', () => {
    const hand = ['A', 'A', '7', '7', '2', '3', '4'];
    expect(rankCounts(hand)).toStrictEqual({
      'A': 2,
      '7': 2,
      '2': 1,
      '3': 1,
      '4': 1,
    });
  });

  test('three of a kind', () => {
    const hand = ['A', 'A', 'A', '5', '2', '3', '4'];
    expect(rankCounts(hand)).toStrictEqual({
      'A': 3,
      '5': 1,
      '2': 1,
      '3': 1,
      '4': 1,
    });
  });

  test('full house', () => {
    const hand = ['A', 'A', 'A', '7', '7', '3', '4'];
    expect(rankCounts(hand)).toStrictEqual({
      'A': 3,
      '7': 2,
      '3': 1,
      '4': 1,
    });
  });

  test('four of a kind', () => {
    const hand = ['A', 'A', 'A', 'A', '7', '3', '4'];
    expect(rankCounts(hand)).toStrictEqual({
      'A': 4,
      '7': 1,
      '3': 1,
      '4': 1,
    });
  });
});