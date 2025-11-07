import { Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import BodyText from './BodyText';

// Custom component which applies font and fontSize from the current theme to larger text
const HeaderText = ({style, children, ...props}) => {
  const { theme } = useTheme();

  // Return a Text component with additional styles attatched
  return (
    <BodyText>
      <Text 
        style={[
          {fontSize: 18 * theme.fontSize, fontWeight: '500'}, 
        ]} 
        {...props}
      >
        {children}
      </Text>
    </BodyText>
  );
};

export default HeaderText;