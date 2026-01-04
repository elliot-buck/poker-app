import { getGameState, setGameState } from '@/contexts/GameState';
import { Table } from '../table';

// Real source of truth
export const table = new Table();

// Return table snapshot
export const getTableInfo = () => getGameState.tableInfo;

// Commit snapshot of table info to game state
export function commitTable() {
  setGameState(prev => ({
    ...prev,
    tableInfo: table.toSnapshot(),
  }));
}