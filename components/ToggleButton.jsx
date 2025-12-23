import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * ToggleButton Component
 * 
 * @param toggledOnOption - Value to be set when the button is toggled on
 * @param toggledOffOption - Value to be set when the button is toggled off
 * @param selectedOption - Array of currently selected item ids/values
 * @param onSelect - Callback function when a new item is selected
 */

const ToggleButton = ({ 
  toggledOnOption = [], 
  toggledOffOption = [],
  selectedOption = null, 
  onSelect,
}) => {

  const { theme } = useTheme();

  const isSelected = () => {
    return selectedOption  === toggledOnOption;
  };

  const handlePress = () => {
    onSelect?.(selectedOption === toggledOffOption ? toggledOnOption : toggledOffOption);
  };

  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
      ]}
      onPress={() => handlePress()}
      activeOpacity={0.7}
    >
      <Ionicons name={isSelected() ? 'checkbox-outline' : 'square-outline'} size={28} color={theme.color}></Ionicons>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
  }
});

export default ToggleButton;