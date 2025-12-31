import { resetState } from '.';
import { joinPlayer, setDealer, setUser } from '../players';
import { resetSettings, updateSettings } from '../settings';
import { getUserInfo, setStage } from '../state';
import { bettingRound, dealPlayerCards, dealTableCards, resetTable, setBlinds } from '../table';

/**
 * Initiate the game
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

  resetState();
  resetSettings();

  updateSettings(difficulty, turnLength, equityDisplay, helpDisplay, bigBlind);
  joinPlayer(0, userName, 'user', startingChips);

  setUser(userName);
  setDealer(userName);


  joinPlayer(1, 'bot1', 'computer', startingChips);
  joinPlayer(2, 'bot2', 'computer', startingChips);
  joinPlayer(9, 'bot3', 'computer', startingChips);

  // Temporary
  preFlop();
  // flop();
}

/**
 * Initiate the pre flop stage
 */

export function preFlop() {
  setStage(0);

  resetTable();
  setBlinds();

  dealPlayerCards();
  
  bettingRound().then(result => console.log(result));
}

/**
 * Initiate the flop stage
 */

export function flop() {
  setStage(1);

  bettingRound().then(result => console.log(result));
  dealTableCards(3);
}