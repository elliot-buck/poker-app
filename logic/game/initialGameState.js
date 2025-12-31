import { Table } from '../table';

// Game state before any players have joined
export const initialGameState = {
  table: new Table(),
  players: {},
  user: null,
  stage: 0, // Pre-flop
}

export default initialGameState;