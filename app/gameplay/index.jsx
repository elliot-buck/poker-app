import { StyleSheet, View } from "react-native";
import { PokerTable } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const GameplayScreen = () => {
  const { theme } = useTheme();
    
  return ( 
  <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
    <PokerTable
      width={360}
      height={240}
      numberOfSeats={10}
    ></PokerTable>
  </View> );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});

export default GameplayScreen;