import { Image, StyleSheet, View } from 'react-native';
import { BodyText } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';
import { formatNumber, getSmallCardImage, STAGE_NAMES } from '../../utils';


/**
 * TableContent Component
 *
 * @param stageNumber - Current betting stage number
 * @param communityCards - Current community cards (array of card strings)
 * @param potSize - Current pot size 
 * 
 */

// Custom component which displays a hand of 2 cards
const TableContent = ({
    stageNumber,
    communityCards,
    potSize,
  }) => {
    const { theme } = useTheme();

    const normalisedCards = [...communityCards, ...Array(5 - communityCards.length).fill(null)];
    const stageName = STAGE_NAMES[stageNumber]

    console.log('Stage names', stageNumber, STAGE_NAMES, stageName)

    const CARD_WIDTH = 40;
    const CARD_HEIGHT = 56;

    console.log(communityCards, normalisedCards);

    // Return Card Display
    return (  
      <View style={styles.container}>
        <View style={[
          styles.numDisplay,
          {
            height: theme.fontSize * 30,
            borderRadius: theme.fontSize * 15,
            backgroundColor: theme.backgroundColor,
            borderColor: theme.color,
          }
        ]}>
          <BodyText 
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              lineHeight: theme.fontSize * 30,
          }}>
            {stageName}
          </BodyText>
        </View>

        <View
          style={styles.handDisplay}
        >
          {normalisedCards.map((card, index) => (
            <View key={index}>
              {card ? (
                // Display the card image
                <Image
                  source={getSmallCardImage(card)}
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
                  {/* <Text style={[ styles.cardPlaceholderText, { color: theme.color, fontSize: 11 * theme.fontSize } ]}>
                    COMMUNITY CARD
                  </Text> */}
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={[
          styles.numDisplay,
          {
            height: theme.fontSize * 30,
            borderRadius: theme.fontSize * 15,
            backgroundColor: theme.backgroundColor,
            borderColor: theme.color,
          }
        ]}>
          <BodyText 
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              lineHeight: theme.fontSize * 30,
          }}>
            {formatNumber(potSize)}
          </BodyText>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  numDisplay: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  card: {
    borderRadius: 4,
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

export default TableContent;