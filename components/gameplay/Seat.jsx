import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import EmptySeat from './EmptySeat';

/**
 * Seat Component
 * 
 * @param width - Seat UI width
 * @param height - Seat UI height
 * @param coordinates - (x, y) coordinates relative to the table
 * @param position - Seat position around the table
 * @param player - Which player is sitting at this seat
 */

// Custom component which displays a seat around the table
const Seat = ({
  width,
  height,
  coordinates,
  position,
  player=null,
}) => {

  // Retrieve the theme object from context
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.seat,
        {
          width: width,
          height: height,
        },
        coordinates
      ]}
    >
      { player ? (
        <View></View>
      ) : (
        <EmptySeat position={position} ></EmptySeat>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  seat: {
    position: 'absolute',
  },
})

export default Seat;