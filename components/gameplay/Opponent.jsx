import { useGameState } from '@/contexts/GameState';
import { useTheme } from '@/contexts/ThemeContext';
import { getSmallCardImage } from '@/UI_utils';
import { Image, StyleSheet, Text, View } from 'react-native';

/**
 * Opponent Component
 * 
 * @param playerID - ID of the player that this component is representing
 * @param seatHeight
 */

// Custom component which displays an empty seat
const Opponent = ({
  playerID,
  seatHeight,
}) => {

  // Retrieve the theme object from context
  const { theme } = useTheme(); 
  const { gameState } = useGameState();

  const player = gameState.players[playerID]

  const CARD_WIDTH = 50 * 0.75;
  const CARD_HEIGHT = 70 * 0.75;
  
  return (
    <View
      style={[
        styles.opponent,
        { 
          borderColor: theme.color,
          backgroundColor: theme.headerColor,
        },
      ]}
    >
      <View style={styles.info}>
        <Text style={[
          styles.infoText,
          {
            color: theme.color,
            fontSize: 12 * theme.fontSize,
          }
        ]}>
          {player.name}
        </Text>
        <Text style={[
          styles.infoText,
          {
            color: theme.color,
            fontSize: 12 * theme.fontSize,
          }
        ]}>
          {player.chips}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <Image
          source={getSmallCardImage(player.holeCards[0])}
          style={[
            styles.leftCard,
            {
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              top: (seatHeight-CARD_HEIGHT) / 2 - 2,
              left: -1,
            }
          ]}
          resizeMode="contain"
        />
        <Image
          source={getSmallCardImage(player.holeCards[1])} 
          style={[
            styles.rightCard,
            {
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              top: (seatHeight-CARD_HEIGHT) / 2 - 2,
              left: CARD_WIDTH*0.75 -1,
            }
          ]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  opponent: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: 'row',
  },
  info: {
    height: '100%',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  infoText: {

  },
  cardContainer: {
    position: 'relative',
    flex: 3,
  },
  leftCard: {
    position: 'absolute',
    transform: [{ rotate: '-6deg' }]
  },
  rightCard: {
    position: 'absolute',
    transform: [{ rotate: '6deg' }]
  }
})

export default Opponent;