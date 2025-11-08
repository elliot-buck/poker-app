import { StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

// Custom component which applies font and fontSize from the current theme
const BodyText = ({ style, children, ...props }) => {
  const { theme } = useTheme();

  // Return a Text component with additional styles attatched
  return (
    <View 
      style={[styles.button, { backgroundColor: theme.headerColor, borderColor: theme.color, height: 72*theme.fontSize }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2, 
  },
})

export default BodyText;