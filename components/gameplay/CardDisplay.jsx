import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { CARD_IMAGES, getCardImage } from '../../utils/cardImages';

console.log('Card image:', CARD_IMAGES['AS']);

/**
 * CardDisplay Component
 * 
 * @param hand - Array containing two card strings
 */

// Custom component which displays a hand of 2 cards
const CardDisplay = ({
    hand=[]
  }) => {
    const { theme } = useTheme();

    if (hand.length !== 2) {
      hand = [null, null]
    }

    // Return Card Display
    return (  
      <View
        style={[styles.container]}
      >
        {hand.map((card, index) => (
          <View key={index} style={styles.cardWrapper}>
            {card ? (
              // Display the card image
              <Image
                source={getCardImage(card)}
                style={styles.card}
                resizeMode="contain"
              />
            ) : (
              // Display placeholder for null card
              <View
                style={[
                  styles.cardPlaceholder,
                  { borderColor: theme.color }
                ]}
              >
                <Text style={[ styles.cardPlaceholderText, { color: theme.color, fontSize: 11 * theme.fontSize } ]}>
                  HOLE CARD
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  cardWrapper: {
    
  },
  card: {
    width: 100,
    height: 140,
    borderRadius: 8,
  },
  cardPlaceholder: {
    justifyContent: 'center',
    width: 100,
    height: 140,
    borderRadius: 8,
    borderWidth: 1,
    opacity: 0.5,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  cardPlaceholderText: {
    textAlign: 'center',
  },
});

export default CardDisplay;