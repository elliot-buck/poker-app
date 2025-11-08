import { Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

// Custom component which applies font and fontSize from the current theme
const BodyText = ({ style, children, ...props }) => {
  const { theme } = useTheme();

  // Return a Text component with additional styles attatched
  return (
    <Text 
      style={[
        {fontFamily: theme.font, fontSize: 16 * theme.fontSize, color: theme.color},
        style 
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

export default BodyText;