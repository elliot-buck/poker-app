import { StyleSheet, View } from 'react-native';
import { HeaderText } from '../.';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * EquityDisplay Component
 * 
 * @param equity - Current equity as a decimal
 */

// Custom component which displays the player's equity as a percentage
const CardDisplay = ({
    equity
  }) => {
    const { theme } = useTheme();
  

    // Return Equity display
    return (  
      <View
        style={[
          styles.equityDisplay,
          {
            backgroundColor: theme.headerColor,
            borderColor: theme.color,
            width: theme.fontSize * 120,
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
          {Math.round(equity * 100)}%
        </HeaderText>
      </View>
    );
};

const styles = StyleSheet.create({
  equityDisplay: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});

export default CardDisplay;