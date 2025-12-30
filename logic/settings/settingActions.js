import { initialGameSettings } from '.';
import { getSettings, setSettings } from '../state';

/**
 * Update game settings
 * 
 * @param {string} difficulty
 * @param {int} turnLength
 * @param {boolean} equityDisplay
 * @param {boolean} helpDisplay
 * @param {int} bigBlind
 */

export function updateSettings(difficulty, turnLength, equityDisplay, helpDisplay, bigBlind) {
  setSettings({
    difficulty: difficulty,
    turnLength: turnLength,
    equityDisplay: equityDisplay,
    helpDisplay: helpDisplay,
    bigBlind: bigBlind
  });

  return getSettings();
}

/**
 * Reset game settings
 */

export function resetSettings() {
  setSettings(initialGameSettings);

  return initialGameSettings;
}

