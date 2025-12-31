import { createContext, useContext, useEffect, useState } from 'react';

// React context
const GameSettingsContext = createContext();

// Internal store for JS files
let _gameSettings = {};

// Subscribers (React setState functions)
const subscribers = new Set();

// External setter for non-React code
export const setGameSettings = (updater) => {
  _gameSettings = typeof updater === 'function' ? updater(_gameSettings) : updater;
  // notify React subscribers
  subscribers.forEach((callback) => callback(_gameSettings));
};

// External getter for non-React code
export const getGameSettings = () => _gameSettings;

// React Provider
export const GameSettingsProvider = ({ children }) => {
  const [gameSettings, setState] = useState(_gameSettings);

  useEffect(() => {
    subscribers.add(setState);
    return () => subscribers.delete(setState);
  }, []);

  return (
    <GameSettingsContext.Provider value={{ gameSettings, setGameSettings: setState }}>
      {children}
    </GameSettingsContext.Provider>
  );
};

// Hook for components
export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (!context) throw new Error('useGameSettings must be used within a GameSettingsProvider');
  return context;
};