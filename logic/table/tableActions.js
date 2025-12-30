import { getTable } from '../state';

/**
 * Create a new shuffled deck for the table
 * Remove all table cards
 * Empty the pot
 */

export function resetTable() {
  const table = getTable();

  table.resetTable();

  return table;
}