import { getGameState, setGameState } from '@/contexts/GameState';

export const getTable = () => getGameState().table;

export const setTable = (updater) => {
  setGameState(state => ({
    ...state,
    table: typeof updater === 'function'
      ? updater(state.table)
      : updater
  }));
};