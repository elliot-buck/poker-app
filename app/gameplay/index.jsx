import { ActionButton, CardDisplay, ChipDisplay, EquityDisplay, HandOrderDisplay, PokerTable, Sidebar, TableContent } from '@/components';
import { useGameSettings } from '@/contexts/GameSettings';
import { useGameState } from '@/contexts/GameState';
import { useTheme } from '@/contexts/ThemeContext';
import { PlayerAction, resolveUserAction } from '@/logic/utils';
import { StyleSheet, View } from "react-native";

const GameplayScreen = () => {
  const { theme } = useTheme();
  const { gameState } = useGameState();
  const { gameSettings } = useGameSettings();
    
  return ( 
  <View style={[styles.outerContainer, {backgroundColor: theme.backgroundColor}]}>
    <View style={styles.contentContainer}>
      <PokerTable
        width={55}
        height={25}
        numberOfSeats={10}
        playerSeats={gameState.table.seats}
        players={gameState.players}
      >
        <TableContent
          stageNumber={gameState.stage}
          potSize={gameState.table.pot}
          communityCards={gameState.table.cards}
        ></TableContent>
      </PokerTable>
      <EquityDisplay equity={1.0}></EquityDisplay>
      <CardDisplay hand={gameState.user.hand}></CardDisplay>
      <View style={styles.horizontal}>
        <ChipDisplay chips={gameState.user.chips}></ChipDisplay>
        <View style={styles.actionButtons}>
          <ActionButton title="Check" onPress={() => resolveUserAction({
            type: PlayerAction.CHECK
          })} />
          <ActionButton title="Call" onPress={() => resolveUserAction({
            type: PlayerAction.CALL
          })} />
          <ActionButton title="Fold" onPress={() => resolveUserAction({
            type: PlayerAction.FOLD
          })} />
          <ActionButton title="Raise" onPress={() => resolveUserAction({
            type: PlayerAction.RAISE,
            amount: 50,
          })} />
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