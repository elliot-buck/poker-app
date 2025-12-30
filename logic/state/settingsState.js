import { getGameSettings, setGameSettings } from '@/contexts/GameSettings';

export const getSettings = () => getGameSettings();

export const setSettings = (updater) => {
  setGameSettings(settings => (
    typeof updater === 'function'
    ? updater(settings)
    : updater
  ));
};