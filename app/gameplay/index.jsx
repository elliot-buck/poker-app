import { StyleSheet, View } from "react-native";
import { ActionButton, CardDisplay, ChipDisplay, EquityDisplay, HandOrderDisplay, PokerTable, Sidebar, TableContent } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const GameplayScreen = () => {
  const { theme } = useTheme();
    
  return ( 
  <View style={[styles.outerContainer, {backgroundColor: theme.backgroundColor}]}>
    <View style={styles.contentContainer}>
      <PokerTable
        width={55}
        height={25}
        numberOfSeats={10}
      >
        <TableContent
          stage={'Flop'}
          potSize={900_100}
          communityCards={['3C', 'AC', '4D']}
        ></TableContent>
      </PokerTable>
      <EquityDisplay equity={1.0}></EquityDisplay>
      <CardDisplay hand={['AS', null]}></CardDisplay>
      <View style={styles.horizontal}>
        <ChipDisplay chips={1_500_500}></ChipDisplay>
        <View style={styles.actionButtons}>
          <ActionButton text={'Fold'}></ActionButton>
          <ActionButton text={'Call'}></ActionButton>
          <ActionButton text={'Check'}></ActionButton>
          <ActionButton text={'Bet'}></ActionButton>
        </View>
      </View>
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
    gap: 16,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    gap: 20,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default GameplayScreen;