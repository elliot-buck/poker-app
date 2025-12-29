import { Dimensions, StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Seat from './Seat';

/**
 * PokerTable Component
 * 
 * @param width - Table width from centre to edge as a percentage of screen width
 * @param height - Table height from centre to edge as a percentage of screen height
 * @param numberOfSeats - Number of seats around the table
 */

// Custom component which displays the poker table and places seats around the table
const PokerTable = ({
  children,
  width,
  height,
  numberOfSeats,
}) => {

  // Retrieve the theme object from context
  const { theme } = useTheme();

  const WIDTH = width/100 * Dimensions.get('window').width;
  const HEIGHT = height/100 * Dimensions.get('window').height;

  const SEAT_WIDTH = 105;
  const SEAT_HEIGHT = 65;

  // Function to place n seats around the table
  const getSeatPosition = (seatNumber) => {

    // Set angle difference between each seat
    const angleStep = (2 * Math.PI) / numberOfSeats;

    // Get seat angle (start from top and go clockwise)
    let angle = Math.PI / 2 + angleStep * seatNumber;

    // Find seat coordinates relative to center
    let x = Math.cos(angle) * WIDTH * 0.68; //0.35
    let y = Math.sin(angle) * HEIGHT * 0.7; //0.6

    // Convert to absolute position (offset by center and half of seat size)
    // const absoluteX = width*0.63 - SEAT_WIDTH/2 + x;
    // const absoluteY = height*0.6 - SEAT_HEIGHT/2 + y;
    const absoluteX = x - SEAT_WIDTH/2;
    const absoluteY = y + HEIGHT/2 - SEAT_HEIGHT/2 + 20;

    return { left: absoluteX, top: absoluteY };
  };

  return (
    <View
      style={[
      styles.container,
      {
        height: (HEIGHT + SEAT_HEIGHT*2),
        width: '100%',
      }
    ]}>
      <View style={[
        styles.table,
        {
          backgroundColor: theme.headerColor,
          width: HEIGHT,
          height: HEIGHT,
          borderRadius: HEIGHT/2,
          transform:[{ scaleX: WIDTH/HEIGHT }],
          top: SEAT_HEIGHT + 20,
        }
      ]}>
        <View style={[
          styles.tableContent,
          {
            transform:[{ scaleX: HEIGHT/WIDTH }, { translateY: HEIGHT/5 }],
          }
        ]}>
          {children}
        </View>
      </View>
      <View style={[ styles.seatContainer, {top: SEAT_HEIGHT} ]}>
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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    position: 'absolute',
    boxShadow: '0px 8px 2px rgba(0, 0, 0, 0.3)',
  },
  tableContent: {

  },
  seatContainer: {
    position: 'absolute',
    backgroundColor: 'red',
  },
  seat: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
})

export default PokerTable;