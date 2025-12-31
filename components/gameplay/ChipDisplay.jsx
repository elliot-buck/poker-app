import { Image, StyleSheet, View } from 'react-native';
import { HeaderText } from '../.';
import { useTheme } from '../../contexts/ThemeContext';
import { formatNumber } from '../../UI_utils';

/**
 * ChipDisplay Component
 * 
 * @param chips - Current number of chips
 */

// Custom component which displays a player's chip count
const ChipDisplay = ({
    chips
  }) => {
    const { theme } = useTheme();
    
    const CHIP_IMAGE = require('../../assets/images/poker-chips-image.svg');

    // Return chip display
    return (  
      <View style={[
        styles.container,
        { height: 180 + theme.fontSize * 30 }
      ]}>
        <Image
          source={CHIP_IMAGE}
          style={styles.chipImage}
          resizeMode="contain"
        />
        <View style={[
            styles.chipDisplay,
            {
              backgroundColor: theme.headerColor,
              borderColor: theme.color,
              height: theme.fontSize * 30,
              borderRadius: theme.fontSize * 8,
            }
          ]}
        >
          <HeaderText 
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              lineHeight: theme.fontSize * 30,
          }}>
            {formatNumber(chips)}
          </HeaderText>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 140,
  },
  chipDisplay: {
    width: '100%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipImage: {
    flex: 1,
    width: '100%',
  }
});

export default ChipDisplay;