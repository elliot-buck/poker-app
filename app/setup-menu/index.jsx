import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { CentredButton, HeaderText, MultiSelect, SpaceBetweenContainer, TextInputField, ToggleButton } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const SetupMenuScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [difficulty, setDifficulty] = useState('Beginner');
  const [turnLength, setTurnLength] = useState(30);
  const [equityDisplay, setEquityDisplay] = useState(false);
  const [helpDisplay, setHelpDisplay] = useState(false);
  const [startingChips, setStartingChips] = useState(1000);
  const [bigBlind, setBigBlind] = useState(50);

  return ( 
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>

      {/* Container for setup menu buttons */}
        <View style={styles.section}>
          <SpaceBetweenContainer>
            <View style={styles.leftContent}>
              <Ionicons name="people-outline" size={28} color={theme.color} />
              <HeaderText>Difficulty</HeaderText>
            </View>

            <MultiSelect
              optionValues={['Beginner', 'Intermediate', 'Advanced']}
              optionText={['Beginner', 'Intermediate', 'Advanced']}
              selectedOption={difficulty}
              onSelect={setDifficulty}
              flexDirection={'column'}
            ></MultiSelect>
          </SpaceBetweenContainer>

          <SpaceBetweenContainer>
            <View style={styles.leftContent}>
              <Ionicons name="timer-outline" size={28} color={theme.color} />
              <HeaderText>Turn Length</HeaderText>
            </View>

            <MultiSelect
              optionValues={[30, 60, 0]}
              optionText={['30s', '60s', 'Infinite']}
              selectedOption={turnLength}
              onSelect={setTurnLength}
            ></MultiSelect>
          </SpaceBetweenContainer>

          <SpaceBetweenContainer>
            <View style={styles.leftContent}>
              <Ionicons name="dice-outline" size={28} color={theme.color} />
              <HeaderText>Show Equity</HeaderText>
            </View>

            <ToggleButton
              toggledOnOption={true}
              toggledOffOption={false}
              selectedOption={equityDisplay}
              onSelect={setEquityDisplay}
            ></ToggleButton>
          </SpaceBetweenContainer>

          <SpaceBetweenContainer>
            <View style={styles.leftContent}>
              <Ionicons name="help-circle-outline" size={28} color={theme.color} />
              <HeaderText>Show Help Display</HeaderText>
            </View>

            <ToggleButton
              toggledOnOption={true}
              toggledOffOption={false}
              selectedOption={helpDisplay}
              onSelect={setHelpDisplay}
            ></ToggleButton>
          </SpaceBetweenContainer>

          <SpaceBetweenContainer>
            <View style={styles.leftContent}>
              <Ionicons name="cash-outline" size={28} color={theme.color} />
              <HeaderText>Set Starting Chips</HeaderText>
            </View>

            <TextInputField
              text={startingChips}
              onChange={setStartingChips}
            ></TextInputField>
          </SpaceBetweenContainer>

          <SpaceBetweenContainer>
            <View style={styles.leftContent}>
              <Ionicons name="server-outline" size={28} color={theme.color} />
              <HeaderText>Set Big Blind</HeaderText>
            </View>

            <TextInputField
              text={bigBlind}
              onChange={setBigBlind}
            ></TextInputField>
          </SpaceBetweenContainer>

          <CentredButton
            onPress={() => console.log(difficulty, turnLength, equityDisplay, helpDisplay, startingChips, bigBlind)}
          >
            <HeaderText>Log info</HeaderText>
          </CentredButton>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    rowGap: 0,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  }
});


export default SetupMenuScreen;