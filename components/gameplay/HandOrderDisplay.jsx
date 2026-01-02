import { useTheme } from '@/contexts/ThemeContext';
import { HAND_TYPES } from '@/logic/utils';
import { getCardImage } from '@/UI_utils';
import { Image, StyleSheet, Text, View } from 'react-native';

const Sidebar = () => {
  const { theme } = useTheme();

  const EXAMPLE_HANDS = {
    [HAND_TYPES.HIGH_CARD]: ['AS', 'KD', '7H', '5C', '2D'],

    [HAND_TYPES.ONE_PAIR]: ['AS', 'AD', '7H', '5C', '2D'],

    [HAND_TYPES.TWO_PAIR]: ['AS', 'AD', '7H', '7C', '2D'],

    [HAND_TYPES.THREE_OF_A_KIND]: ['AS', 'AD', 'AH', '5C', '2D'],

    [HAND_TYPES.STRAIGHT]: ['5S', '6D', '7H', '8C', '9D'],

    [HAND_TYPES.FLUSH]: ['AS', 'JS', '9S', '5S', '2S'],

    [HAND_TYPES.FULL_HOUSE]: ['AS', 'AD', 'AH', '7C', '7D'],

    [HAND_TYPES.FOUR_OF_A_KIND]: ['AS', 'AD', 'AH', 'AC', '7D'],

    [HAND_TYPES.STRAIGHT_FLUSH]: ['5S', '6S', '7S', '8S', '9S'],
  };

  

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {Object.entries(HAND_TYPES).map(([, handName], index) => (
        <View 
          key={handName.replace(/^-_*(.)|-_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())}
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