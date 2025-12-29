import { createContext, useContext, useState } from 'react'; // Import context modules

const ThemeContext = createContext(); // Create context for shared theme data

// Create a provider to allow child components to access theme data
export const ThemeProvider = ({ children }) => {
  // This is the shared state all screens will use
  const [theme, setTheme] = useState({
    id: 'classic',
    backgroundColor: '#06402B',
    headerColor: '#2E6F40', 
    color: '#fff',
    font: 'sans-serif',
    fontSize: 1,
  });
  
  // This allows it to be used inside the ThemeContext wrapper in the root _layout file
  if (typeof children === 'function') {
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children({theme, setTheme})}</ThemeContext.Provider>;
  }

  // Regular return value
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;

};

export const useTheme = () => {
  // Context gets the current values from ThemeContext
  const context = useContext(ThemeContext);

  return context;
}