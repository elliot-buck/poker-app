import { createContext, useContext, useEffect, useState } from 'react';

// React context for components to read the game Settings
const GameSettingsContext = createContext();

// Internal store for JS files
let _gameSettings = {};

// Subscribers (React setState functions)
const subscribers = new Set();

// Function to update Settings from outside React
// Apply function if updater is of type function, else set gameSettings to the value of updater
export const setGameSettings = (updater) => {
  _gameSettings = typeof updater === 'function' ? updater(_gameSettings) : updater;
  // notify React subscribers
  subscribers.forEach((callback) => callback(_gameSettings));
};

// Getter for non-React code
export const getGameSettings = () => _gameSettings;

// React Provider
export const GameSettingsProvider = ({ children }) => {
  const [gameSettings, setState] = useState(_gameSettings);

   useEffect(() => {
      subscribers.add(setState);
      return () => subscribers.delete(setState);
    }, []);

  // This allows it to be used inside the GameSettingsProvider wrapper in the root _layout file
  if (typeof children === 'function') {
    return <GameSettingsContext.Provider value={{ gameSettings, setGameSettings }}>{children({gameSettings, setGameSettings})}</GameSettingsContext.Provider>;
  }

  // Regular return value
  return <GameSettingsContext.Provider value={{ gameSettings, setGameSettings }}>{children}</GameSettingsContext.Provider>;
};

// Hook for components
export const useGameSettings = () => {
  // Context gets the current values from GameSettingsContext
  const context = useContext(GameSettingsContext);

  return context;
}