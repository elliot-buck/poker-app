import { StyleSheet, TouchableOpacity } from 'react-native';
import { HeaderText } from '../.';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * ActionButton Component
 * 
 * @param title - Text to display on the button
 * @param onPress - Action to carry out on click
 */

// Custom component which displays a player's chip count
const ActionButton = ({
    title,
    onPress,
  }) => {
    const { theme } = useTheme();

    // Return chip display
    return (  
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            borderColor: theme.color,
            height: theme.fontSize * 80,
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
            {title}
          </HeaderText>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
    width: '45%',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 5,
    borderWidth: 1,
  },
});

export default ActionButton;