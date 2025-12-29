import { createContext, useContext, useState } from 'react';

// React context for components to read the game Settings
const GameSettingsContext = createContext();

// Internal store for JS files
let _gameSettings = {
  players: [],
  tableCards: [],
  potSize: 0,
  currentStage: 'pre-flop',
};

// Function to update Settings from outside React
// Apply function if updater is of type function, else set gameSettings to the value of updater
export const setGameSettings = (updater) => {
  _gameSettings = typeof updater === 'function' ? updater(_gameSettings) : updater;
};

// Getter for non-React code
export const getGameSettings = () => _gameSettings;

// React Provider
export const GameSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(_gameSettings);

  // This allows it to be used inside the GameSettingsProvider wrapper in the root _layout file
  if (typeof children === 'function') {
    return <GameSettingsContext.Provider value={{ settings, setSettings }}>{children({settings, setSettings})}</GameSettingsContext.Provider>;
  }

  // Regular return value
  return <GameSettingsContext.Provider value={{ settings, setSettings }}>{children}</GameSettingsContext.Provider>;
};

// Hook for components
export const useGameSettings = () => {
  // Context gets the current values from GameSettingsContext
  const context = useContext(GameSettingsContext);

  return context;
}