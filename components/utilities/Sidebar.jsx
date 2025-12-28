import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85; // 85% of screen width

const Sidebar = ({ children }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(SIDEBAR_WIDTH)).current; // Start off-screen

  // Controls animation opening and closing
  const toggleSidebar = () => {
    const toValue = isOpen ? SIDEBAR_WIDTH : 0;
    
    // Play animation
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <TouchableOpacity
        style={[
          styles.toggleButton,
          {
            backgroundColor: theme.headerColor,
            borderColor: theme.color,
          }
        ]}
        onPress={toggleSidebar}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isOpen ? "close" : "help-outline"} 
          size={28} 
          color={theme.color} 
        />
      </TouchableOpacity>

      {/* Sidebar Panel */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            backgroundColor: theme.headerColor,
            borderLeftColor: theme.color,
            transform: [{ translateX: slideAnim }],
          }
        ]}
      >
        {children}
      </Animated.View>

      {/* Overlay (tap to close) */}
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: SIDEBAR_WIDTH,
    height: SCREEN_HEIGHT,
    borderLeftWidth: 1,
    zIndex: 999,
    padding: 5,
    paddingTop: 80, // Space for toggle button
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
});

export default Sidebar;