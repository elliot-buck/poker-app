import { createContext, useContext, useState } from 'react';

// React context for components to read the game userInfo
const UserInfoContext = createContext();

// Internal store for JS files
let _userInfo = {
  name: 'user',
};

// Function to update userInfo from outside React
// Apply function if updater is of type function, else set userInfo to the value of updater
export const setUserInfo = (updater) => {
  _userInfo = typeof updater === 'function' ? updater(_userInfo) : updater;
};

// Getter for non-React code
export const getUserInfo = () => _userInfo;

// React Provider
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(_userInfo);

  // This allows it to be used inside the UserInfo wrapper in the root _layout file
  if (typeof children === 'function') {
    return <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>{children({userInfo, setUserInfo})}</UserInfoContext.Provider>;
  }

  // Regular return value
  return <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserInfoContext.Provider>;
};

// Hook for components
export const useUserInfo = () => {
  // Context gets the current values from user info
  const context = useContext(userInfo);

  return context;
}