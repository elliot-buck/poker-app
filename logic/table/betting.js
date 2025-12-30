import { getTable } from '../state';

/**
 * Initiate a betting round
 */

export function bettingRound() {
  const { BIG_BLIND, SMALL_BLIND } = getBlinds();
}

/**
 * Return object containing big and small blind amounts
 */

export function getBlinds() {
  const bigBlind = getTable().bigBlind;
  const smallBlind = BIG_BLIND / 2;

  return {
    BIG_BLIND: bigBlind,
    SMALL_BLIND: smallBlind
  }
}

/**
 * Assigns big and small blind to the appropriate players
 */

export function assignBlinds() {
  
}