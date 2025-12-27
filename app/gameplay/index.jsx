import { StyleSheet, View } from "react-native";
import { CardDisplay, EquityDisplay, PokerTable } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const GameplayScreen = () => {
  const { theme } = useTheme();
    
  return ( 
  <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
    <PokerTable
      width={60}
      height={20}
      numberOfSeats={10}
    ></PokerTable>
    <EquityDisplay equity={1.0}></EquityDisplay>
    <CardDisplay hand={['AS', null]}></CardDisplay>
  </View> );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    gap: 8,
  },
});

export default GameplayScreen;