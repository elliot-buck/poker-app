import { createContext, useContext, useEffect, useState } from 'react';

// React context
const GameStateContext = createContext();

// Internal store for JS files
let _gameState = {};

// Subscribers (React setState functions)
const subscribers = new Set();

// External setter for non-React code
export const setGameState = (updater) => {
  _gameState = typeof updater === 'function' ? updater(_gameState) : updater;
  // notify React subscribers
  subscribers.forEach((callback) => callback(_gameState));
};

// External getter for non-React code
export const getGameState = () => _gameState;

// React Provider
export const GameStateProvider = ({ children }) => {
  const [gameState, setState] = useState(_gameState);

  useEffect(() => {
    subscribers.add(setState);
    return () => subscribers.delete(setState);
  }, []);

  return (
    <GameStateContext.Provider value={{ gameState, setGameState: setState }}>
      {children}
    </GameStateContext.Provider>
  );
};

// Hook for components
export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) throw new Error('useGameState must be used within a GameStateProvider');
  return context;
};