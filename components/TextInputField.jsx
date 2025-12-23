import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * TextInputField Component
 * 
 * @param text - Text value
 * @param onChange - Callback function when text is changed
 */

const TextInputField = ({ 
  text = '', 
  onChange,
}) => {

  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[{
          backgroundColor: theme.backgroundColor,
          fontSize: 16*theme.fontSize,
          color: theme.color,
          width: 72*theme.fontSize
        },
        styles.input,
        isFocused && styles.inputFocused,
        isFocused && { borderColor: theme.color },
      ]}
      onChangeText={onChange}
      value={text}

      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 12
  },
  inputFocused: {
    outlineStyle: 'none',
    padding: 8,
    borderWidth: 2,
  }
});

export default TextInputField;