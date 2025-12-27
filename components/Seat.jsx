import { StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * PokerTable Component
 * 
 * @param width - Seat UI width
 * @param height - Seat UI height
 * @param coordinates - (x, y) coordinates relative to the table
 * @param position - Seat position around the table
 */

// Custom component which displays the poker table and places seats around the table
const Seat = ({
  width,
  height,
  coordinates,
  position,
}) => {

  console.log(width, height, coordinates)

  // Retrieve the theme object from context
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.seat,
        {
          borderColor: theme.color,
          width: width,
          height: height,
        },
        coordinates
      ]}
    >
    </View>
  );
};

const styles = StyleSheet.create({
  seat: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    opacity: 0.5
  },
})

export default Seat;