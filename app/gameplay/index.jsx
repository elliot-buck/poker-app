import { StyleSheet, View } from "react-native";
import { CardDisplay, EquityDisplay, HandOrderDisplay, PokerTable, Sidebar } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const GameplayScreen = () => {
  const { theme } = useTheme();
    
  return ( 
  <View style={[styles.outerContainer, {backgroundColor: theme.backgroundColor}]}>
    <View style={styles.contentContainer}>
      <PokerTable
        width={60}
        height={20}
        numberOfSeats={10}
      ></PokerTable>
      <EquityDisplay equity={1.0}></EquityDisplay>
      <CardDisplay hand={['AS', null]}></CardDisplay>
    </View>
    <Sidebar><HandOrderDisplay></HandOrderDisplay></Sidebar>
  </View> );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    gap: 8,
  },
});

export default GameplayScreen;