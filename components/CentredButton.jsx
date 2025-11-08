import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

// Custom component which applies button styling and centres text
const BodyText = ({ style, children, ...props }) => {
  const { theme } = useTheme();

  // Return a View component with additional styles attatched
  return (
    <Pressable 
      style={[styles.selectButton, { backgroundColor: theme.headerColor, borderColor: theme.color}, style]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2, 
  },
})

export default BodyText;