import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getCardImage } from '../../UI_utils';

const Sidebar = () => {
  const { theme } = useTheme();

  const EXAMPLE_HANDS = {
    'High Card': ['AS', 'KD', '7H', '5C', '2D'],

    'One Pair': ['AS', 'AD', '7H', '5C', '2D'],

    'Two Pair': ['AS', 'AD', '7H', '7C', '2D'],

    'Three of a Kind': ['AS', 'AD', 'AH', '5C', '2D'],

    'Straight': ['5S', '6D', '7H', '8C', '9D'],

    'Flush': ['AS', 'JS', '9S', '5S', '2S'],

    'Full House': ['AS', 'AD', 'AH', '7C', '7D'],

    'Four of a Kind': ['AS', 'AD', 'AH', 'AC', '7D'],

    'Straight Flush': ['5S', '6S', '7S', '8S', '9S'],

    'Royal Flush': ['TS', 'JS', 'QS', 'KS', 'AS']
  };

  const HAND_ORDER = [
    'Royal Flush',
    'Straight Flush',
    'Four of a Kind',
    'Full House',
    'Flush',
    'Straight',
    'Three of a Kind',
    'Two Pair',
    'One Pair',
    'High Card'
  ];

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {HAND_ORDER.map((handName, index) => (
        <View 
          key={handName}
          style={[
            styles.row,
            (index % 2 === 1)
              ? { backgroundColor: theme.headerColor }
              : null,
          ]}
        >
          <View style={styles.title}>
            <Text
              style={[
                styles.titleText,
                {
                  color: theme.color,
                  fontSize: theme.fontSize * 18,
                }
              ]}
            >
              {handName}
            </Text>
          </View>
          <View
            style={styles.handDisplay}
          >
            {EXAMPLE_HANDS[handName] && EXAMPLE_HANDS[handName].map((card, index) => (
              <Image
                key={index}
                source={getCardImage(card)}
                style={styles.card}
                resizeMode="contain"
              />   
            ))}
          </View>
        </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 5,
    width: '100%',
    height: '92%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }, 
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 4,
  },
  title: {
    width: '19%',
  },
  titleText: {
    height: '100%',
    verticalAlign: 'center',
  },
  handDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  card: {
    width: 50,
    height: 70,
    borderRadius: 4,
  },
});

export default Sidebar;