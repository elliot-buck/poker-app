import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * SelectButton Component
 * 
 * @param position - Where the button is relative to others: top, bottom, middle or alone (default)
 */

// Custom component which applies font and fontSize from the current theme
const SelectButton = ({ 
  position='alone',
  style, 
  children, 
  ...props
}) => {
  const { theme } = useTheme();

  // Return a Text component with additional styles attatched
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: theme.headerColor},
        position === 'alone' && styles.alone,
        position === 'top' && styles.top,
        position === 'middle' && styles.middle,
        position === 'bottom' && styles.bottom,
        style
      ]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  alone: {
    borderRadius: 12,
    marginBottom: 12,
  },
  top: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  middle: {
    borderRadius: 0,
  },
  bottom: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 12,
  },
})

export default SelectButton;