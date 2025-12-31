import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getCardImage } from '../../UI_utils';

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

    const SCREEN_WIDTH = Dimensions.get('window').width;

    const CARD_WIDTH = SCREEN_WIDTH * 0.3;
    const CARD_HEIGHT = CARD_WIDTH * 7/5;

    if (hand.length !== 2) {
      hand = [null, null]
    }

    // Return Card Display
    return (  
      <View
        style={[styles.container]}
      >
        {hand.map((card, index) => (
          <View key={index}>
            {card ? (
              // Display the card image
              <Image
                source={getCardImage(card)}
                style={[
                  styles.card,
                  {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  }
                ]}
                resizeMode="contain"
              />
            ) : (
              // Display placeholder for null card
              <View
                style={[
                  styles.cardPlaceholder,
                  { 
                    borderColor: theme.color,
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  }
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
  card: {
    borderRadius: 8,
  },
  cardPlaceholder: {
    justifyContent: 'center',
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