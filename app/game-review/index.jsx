import { StyleSheet, Text, View } from "react-native";
import { useTheme } from '../../contexts/ThemeContext';

const GameReviewScreen = () => {
  const { theme } = useTheme();
  
  return ( <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
    <Text>Game Review</Text>
  </View> );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default GameReviewScreen;