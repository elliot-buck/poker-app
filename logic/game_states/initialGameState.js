import { Table } from '..';

// Game state before any players have joined
export const initialGameState = {
  table: new Table(),
  players: Object.fromEntries(
    Array.from({ length: 11 }, (_, i) => [i, null])
  ),
  positions: [],
  userPosition: null,
  user: null,
  stage: 0, // Pre-flop
  dealer: 0,
}

export default initialGameState;