import { Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import BodyText from './BodyText';

// Custom component which applies font and fontSize from the current theme to title text
const TitleText = ({style, children, ...props}) => {
  const { theme } = useTheme();

  // Return a Text component with additional styles attatched
  return (
    <BodyText>
      <Text 
        style={[
          {fontSize: 24 * theme.fontSize, fontWeight: 'bold'}
        ]} 
        {...props}
      >
        {children}
      </Text>
    </BodyText>
  );
};

export default TitleText;