import { GameSettingsProvider } from './GameSettings';
import { GameStateProvider } from './GameState';
import { ThemeProvider } from './ThemeContext';
import { UserInfoProvider } from './UserInfo';

const AppProviders = ({ children }) => (
  <ThemeProvider>
  <GameStateProvider>
  <GameSettingsProvider>
  <UserInfoProvider>
    {children}
  </UserInfoProvider>
  </GameSettingsProvider>
  </GameStateProvider>
  </ThemeProvider>
);

export default AppProviders;