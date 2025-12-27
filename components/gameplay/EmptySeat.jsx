import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * EmptySeat Component
 * 
 * @param position - Seat position around the table
 */

// Custom component which displays an empty seat
const EmptySeat = ({
  position,
}) => {

  // Retrieve the theme object from context
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.emptySeat,
        { borderColor: theme.color },
      ]}
    >
      <Text
        style={[
          styles.number,
          { 
            color: theme.color,
            fontSize: theme.fontSize * 11,
          }
        ]}
      >
        { position }
      </Text>
      <Text
        style={[
          styles.defaultText,
          { 
            color: theme.color,
            fontSize: theme.fontSize * 11,
          }
        ]}
      >
        EMPTY
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  emptySeat: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    opacity: 0.5,
    flexDirection: 'column',
    padding: 4,
  },
  number: {
    alignSelf: 'left',
  },
  defaultText: {
    alignSelf: 'center',
  }
})

export default EmptySeat;