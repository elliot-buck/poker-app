import { getGameState, setGameState } from '@/contexts/GameState';

export const getStage = () => getGameState().stage;

export const setStage = (updater) => {
  setGameState(state => ({
    ...state,
    stage: typeof updater === 'function'
      ? updater(state.table)
      : updater
  }));
};