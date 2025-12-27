import { StyleSheet, Text, View } from 'react-native';
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
          }
        ]}
      >
        <Text style={[styles.equityText, { color: theme.color }]}>
          {Math.round(equity * 100)}%
        </Text>
      </View>
    );
};

const styles = StyleSheet.create({
  equityDisplay: {
    width: 120,
    height: 40,
    borderRadius: 20,
    padding: 2,
  },

  equityText: {
    textAlign: 'center',
    fontSize: 24,
  }
});

export default CardDisplay;