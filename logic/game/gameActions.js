import { initialGameState } from '.';
import { setGameState } from '../state';

/**
 * Set game state to initial game state
 */

export function resetState() {
  setGameState(initialGameState);

  return initialGameState;
}