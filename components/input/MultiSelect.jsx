import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import BodyText from '../utilities/BodyText';

/**
 * MultiSelect Component
 * 
 * @param optionValues - Array of values corresponding to text options
 * @param optionText - Array of text options to display
 * @param selectedOption - Currently selected value (single select mode)
 * @param selectedOptions - Array of currently selected values (multi select mode)
 * @param onSelect - Callback function when selection changes
 * @param flexDirection - 'row' or 'column' layout
 * @param multiSelect - Enable multi-select mode (default: false)
 */

const MultiSelect = ({ 
  optionValues = [], 
  optionText = [],
  selectedOption = null,
  selectedOptions = [], 
  onSelect,
  flexDirection = 'row',
  multiSelect = false,
}) => {

  const { theme } = useTheme();
  const [maxDimensions, setMaxDimensions] = React.useState({ width: 0, height: 0 });

  const isSelected = (value) => {
    if (multiSelect) {
      return selectedOptions.includes(value);
    }
    return selectedOption === value;
  };

  const handlePress = (value) => {
    if (!onSelect) return;
    
    if (multiSelect) {
      // Multi-select: toggle selection
      if (isSelected(value)) {
        onSelect(selectedOptions.filter(v => v !== value));
      } else {
        onSelect([...selectedOptions, value]);
      }
    } else {
      // Single-select: just set the value
      onSelect(value);
    }
  };

  const handleLayout = (event, index) => {
    const { width, height } = event.nativeEvent.layout;
    setMaxDimensions(prev => ({
      width: Math.max(prev.width, width),
      height: Math.max(prev.height, height)
    }));
  };

  const getOptionStyle = (index) => {
    const isRow = flexDirection === 'row';
    const isFirst = index === 0;
    const isLast = index === optionValues.length - 1;
    
    if (isRow) {
      if (isFirst) return styles.optionLeftRow;
      if (isLast) return styles.optionRightRow;
      return styles.optionMiddleRow;
    } else {
      if (isFirst) return styles.optionTopColumn;
      if (isLast) return styles.optionBottomColumn;
      return styles.optionMiddleColumn;
    }
  };

  return (
    <View style={[
      flexDirection === 'column' ? styles.column : styles.row,
      {backgroundColor: theme.headerColor}
    ]}>
      {optionValues.map((value, index) => (
        <TouchableOpacity
          key={value}
          onLayout={(e) => handleLayout(e, index)}
          style={[
            styles.option,
            getOptionStyle(index),
            maxDimensions.width > 0 && { 
              width: maxDimensions.width,
              height: maxDimensions.height 
            },
            isSelected(value) ? {backgroundColor: 'transparent'} : {backgroundColor: theme.backgroundColor},
          ]}
          onPress={() => handlePress(value)}
          activeOpacity={0.7}
        >
          <BodyText>
            {optionText[index] || value}
          </BodyText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 12,
  },
  option: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Row layout borders
  optionLeftRow: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderRightColor: 'transparent',
  },
  optionRightRow: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderLeftColor: 'transparent',
  },
  optionMiddleRow: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
  },
  // Column layout borders
  optionTopColumn: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderBottomColor: 'transparent',
  },
  optionBottomColumn: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderTopColor: 'transparent',
  },
  optionMiddleColumn: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
  },
});

export default MultiSelect;