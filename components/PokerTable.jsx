import { StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Seat from './Seat';

/**
 * PokerTable Component
 * 
 * @param width - Table width from centre to edge
 * @param height - Table height from centre to edge
 * @param numberOfSeats - Number of seats around the table
 */

// Custom component which displays the poker table and places seats around the table
const PokerTable = ({
  width,
  height,
  numberOfSeats,
}) => {

  // Retrieve the theme object from context
  const { theme } = useTheme();

  const SEAT_WIDTH = 65;
  const SEAT_HEIGHT = 50;

  // Function to place n seats around the table
  const getSeatPosition = (seatNumber) => {

    // Set angle difference between each seat
    const angleStep = (2 * Math.PI) / numberOfSeats;

    // Get seat angle (start from top and go clockwise)
    let angle = Math.PI / 2 + angleStep * seatNumber;

    // Find seat coordinates relative to center
    let x = Math.cos(angle) * width * 0.35;
    let y = Math.sin(angle) * height * 0.6;

    // Convert to absolute position (offset by center and half of seat size)
    const absoluteX = width*0.5*(height/width) - SEAT_WIDTH/2 + x;
    const absoluteY = height*0.5 - SEAT_HEIGHT/2 + y;

    return { left: absoluteX, top: absoluteY };
  };

  return (
    <View
      style={[
      styles.container,
      {
        height: height + SEAT_HEIGHT,
        width: '100%',
      }
    ]}>
    <View style={[
      styles.table,
      {
        backgroundColor: theme.headerColor,
        width: height,
        height: height,
        borderRadius: height/2,
        transform:[{ scaleX: width/height}]
      }
    ]}>
      {[...Array(numberOfSeats-1).keys()].map((seatNumber) => (
        <Seat
          width={SEAT_WIDTH}
          height={SEAT_HEIGHT}
          coordinates={getSeatPosition(seatNumber+1)}
          position={seatNumber+1}
        >
        </Seat>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    position: 'relative',
    boxShadow: '0px 8px 2px rgba(0, 0, 0, 0.3)',
  },
  seat: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
})

export default PokerTable;