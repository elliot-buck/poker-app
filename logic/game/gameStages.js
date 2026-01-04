import { resetState } from '.';
import { getPlayerHands, getWinningPlayers, joinPlayer, setDealer, setUser } from '../players';
import { resetSettings, updateSettings } from '../settings';
import { getPlayers, getUserInfo } from '../state';
import { bettingRound, dealPlayerCards, dealTableCards, distributePots, resetTable, setBlinds } from '../table';

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

export const startGame = (difficulty, turnLength, equityDisplay, helpDisplay, startingChips, bigBlind) => {
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
}

/**
 * Initiate the pre flop stage
 */

export const preFlop = async () => {
  resetTable();
  setBlinds();

  dealPlayerCards();
  
  const bettingWinner = await bettingRound()
  
  if (bettingWinner) {
    return formatResult(bettingWinner);
  }
}

/**
 * Initiate the flop stage
 */

export const flop = async () => {
  dealTableCards(3);
  
  const bettingWinner = await bettingRound()
  
  if (bettingWinner) {
    return formatResult(bettingWinner);
  }
}

/**
 * Initiate the turn stage
 */

export const turn = async () => {
  dealTableCards(1);

  const bettingWinner = await bettingRound()
  
  if (bettingWinner) {
    return formatResult(bettingWinner);
  }
}

/**
 * Initiate the river stage
 */

export const river = async () => {
  dealTableCards(1);

  const players = getPlayers();
  const playerHands = getPlayerHands(players);

  const bettingWinner = await bettingRound();

  if (bettingWinner) {
    return formatResult(bettingWinner);
  } 

  const winningPlayers = getWinningPlayers(playerHands);

  distributePots(playerHands);

  return formatResult(winningPlayers, true);
}

/**
 * Format the round result
 */

const WIN_TYPE = {
  SHOWDOWN: 'showdown',
  NO_SHOWDOWN: 'no_showdown'
}

function formatResult(winningPlayers, winAtShowdown=false) {
  let winType;
  
  winType = winAtShowdown ? WIN_TYPE.SHOWDOWN : WIN_TYPE.NO_SHOWDOWN;

  return Object.fromEntries(
    winningPlayers.map(playerID => (
      playerID,
      {
        winType: winType
      }
    ))
  );
}

/**
 * Format stage functions
 */

const STAGE_FUNCTIONS = {
  'pre-flop': preFlop,
  'flop': flop,
  'turn': turn,
  'river': river,
};

/**
 * Return the function associated with a string
 * 
 * @param {string} stage 
 * @returns {function}
 */

export const getStageFunction = (stage) => {
  const fn = STAGE_FUNCTIONS[stage];

  if (!fn) {
    throw new Error(`Unknown stage: ${stage}`);
  }

  return fn;
};