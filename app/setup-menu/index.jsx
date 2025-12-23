import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { CentredButton, HeaderText, MultiSelect, SpaceBetweenContainer } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const SetupMenuScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [difficulty, setDifficulty] = useState('Beginner');
   const [turnLength, setTurnLength] = useState(30);

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

          <CentredButton
            onPress={() => console.log(difficulty, turnLength)}
          >
            <HeaderText>Log difficulty</HeaderText>
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