import { getGameState, setGameState } from '@/contexts/GameState';

export const getPlayers = () => getGameState().players;

export const setPlayers = (updater) => {
  setGameState(state => ({
    ...state,
    players: typeof updater === 'function'
      ? updater(state.table)
      : updater
  }));
};