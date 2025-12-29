import { dealPlayerCards, dealTableCards, joinPlayer, newGame, resetTable, setStage, setUser, updateSettings } from '.';
import { getUserInfo } from '../contexts/UserInfo';

/**
 * 
 * @param {string} difficulty - Difficulty (easy/medium/hard)
 * @param {number} turnLength - Time for each player to take their turn (s)
 * @param {boolean} equityDisplay - Whether or not to display equity
 * @param {boolean} helpDisplay - Whether or not to enable hand order display
 * @param {number} startingChips - Each player's starting chips
 * @param {number} bigBlind - Value of the big blind
 */

export function startGame(difficulty, turnLength, equityDisplay, helpDisplay, startingChips, bigBlind) {
  const userName = getUserInfo().name;

  newGame();

  updateSettings(difficulty, turnLength, equityDisplay, helpDisplay, bigBlind)

  joinPlayer(0, userName, startingChips);
  setUser(0)

  joinPlayer(1, 'bot1', startingChips);
  joinPlayer(2, 'bot2', startingChips);

  // Temporary
  preFlop();
  dealFlop();
}

export function preFlop() {
  setStage(0);

  resetTable();
  dealPlayerCards();
}

export function dealFlop() {
  setStage(1);

  dealTableCards(3);
}