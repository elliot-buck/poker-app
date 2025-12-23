import { StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

// Custom component which applies font and fontSize from the current theme
const SpaceBetweenContainer = ({ style, children, ...props }) => {
  const { theme } = useTheme();

  // Return a View component with additional styles attached
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.headerColor, 
          borderColor: theme.color,
          minHeight: 72 * theme.fontSize  // Changed from height to minHeight
        }, 
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2, 
  },
})

export default SpaceBetweenContainer;