import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BodyText } from '.';
import { useTheme } from '../contexts/ThemeContext';

/**
 * MultiSelectMenu Component
 * 
 * @param optionValues - Array of text options
 * @param optionText - Array of values corresponding to text options
 * @param selectedOption - Array of currently selected item ids/values
 * @param onSelect - Callback function when a new item is selected
 */

const MultiSelectMenu = ({ 
  optionValues = {}, 
  optionText = {},
  selectedOption = null, 
  onSelect,
}) => {

  const { theme } = useTheme();
  const indexedOptions = Array.from(optionValues.entries());

  const isSelected = (optionIndex) => {
    return selectedOption  === optionValues[optionIndex];
  };

  const handlePress = (optionIndex) => {
    onSelect?.(optionValues[optionIndex]);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.headerColor}]}>
      {indexedOptions.map(([index, option]) => 
        <TouchableOpacity
          key={option}
          style={[
            styles.option, {backgroundColor: theme.backgroundColor},
            index === 0 && styles.optionLeft,
            index === optionValues.length-1 && styles.optionRight,
            isSelected(index) && {backgroundColor: 'transparent'},
          ]}
          onPress={() => handlePress(index)}
          activeOpacity={0.7}
        >
          <BodyText>
            {optionText[index]}
          </BodyText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: '120%',
  },
  optionLeft: {
    padding: 8,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderRightColor: 'transparent'
  },
  optionRight: {
    padding: 8,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderLeftColor: 'transparent'
  },
  option: {
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    
  },
});

export default MultiSelectMenu;