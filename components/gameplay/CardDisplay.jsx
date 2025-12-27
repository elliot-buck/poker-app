import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

// All card images must be explicitly required for React Native bundler
const CARD_IMAGES = {
  // Clubs
  '2C': require('../../assets/images/cards/2C.svg'),
  '3C': require('../../assets/images/cards/3C.svg'),
  '4C': require('../../assets/images/cards/4C.svg'),
  '5C': require('../../assets/images/cards/5C.svg'),
  '6C': require('../../assets/images/cards/6C.svg'),
  '7C': require('../../assets/images/cards/7C.svg'),
  '8C': require('../../assets/images/cards/8C.svg'),
  '9C': require('../../assets/images/cards/9C.svg'),
  'TC': require('../../assets/images/cards/TC.svg'),
  'JC': require('../../assets/images/cards/JC.svg'),
  'QC': require('../../assets/images/cards/QC.svg'),
  'KC': require('../../assets/images/cards/KC.svg'),
  'AC': require('../../assets/images/cards/AC.svg'),
  // Diamonds
  '2D': require('../../assets/images/cards/2D.svg'),
  '3D': require('../../assets/images/cards/3D.svg'),
  '4D': require('../../assets/images/cards/4D.svg'),
  '5D': require('../../assets/images/cards/5D.svg'),
  '6D': require('../../assets/images/cards/6D.svg'),
  '7D': require('../../assets/images/cards/7D.svg'),
  '8D': require('../../assets/images/cards/8D.svg'),
  '9D': require('../../assets/images/cards/9D.svg'),
  'TD': require('../../assets/images/cards/TD.svg'),
  'JD': require('../../assets/images/cards/JD.svg'),
  'QD': require('../../assets/images/cards/QD.svg'),
  'KD': require('../../assets/images/cards/KD.svg'),
  'AD': require('../../assets/images/cards/AD.svg'),
  // Hearts
  '2H': require('../../assets/images/cards/2H.svg'),
  '3H': require('../../assets/images/cards/3H.svg'),
  '4H': require('../../assets/images/cards/4H.svg'),
  '5H': require('../../assets/images/cards/5H.svg'),
  '6H': require('../../assets/images/cards/6H.svg'),
  '7H': require('../../assets/images/cards/7H.svg'),
  '8H': require('../../assets/images/cards/8H.svg'),
  '9H': require('../../assets/images/cards/9H.svg'),
  'TH': require('../../assets/images/cards/TH.svg'),
  'JH': require('../../assets/images/cards/JH.svg'),
  'QH': require('../../assets/images/cards/QH.svg'),
  'KH': require('../../assets/images/cards/KH.svg'),
  'AH': require('../../assets/images/cards/AH.svg'),
  // Spades
  '2S': require('../../assets/images/cards/2S.svg'),
  '3S': require('../../assets/images/cards/3S.svg'),
  '4S': require('../../assets/images/cards/4S.svg'),
  '5S': require('../../assets/images/cards/5S.svg'),
  '6S': require('../../assets/images/cards/6S.svg'),
  '7S': require('../../assets/images/cards/7S.svg'),
  '8S': require('../../assets/images/cards/8S.svg'),
  '9S': require('../../assets/images/cards/9S.svg'),
  'TS': require('../../assets/images/cards/TS.svg'),
  'JS': require('../../assets/images/cards/JS.svg'),
  'QS': require('../../assets/images/cards/QS.svg'),
  'KS': require('../../assets/images/cards/KS.svg'),
  'AS': require('../../assets/images/cards/AS.svg'),
};

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
                source={CARD_IMAGES[card]}
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