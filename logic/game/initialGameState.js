import { Table } from '../table';

// Game state before any players have joined
export const initialGameState = {
  table: new Table(),
  players: {},
  seats: Array(10).fill(null),
  user: null,
  stage: 0, // Pre-flop
  dealer: null,
}

export default initialGameState;