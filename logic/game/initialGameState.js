
// Game state before any players have joined
export const initialGameState = {
  tableInfo: {
    cards: [],
    seats: [],
    maxBet: 0, 
    dealerPosition: null,
    bettingPlayerID: null,
    pot: 0,
  },
  players: {},
  user: null,
  stage: 0, // Pre-flop
}

export default initialGameState;