import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { HeaderText, MultiSelect, SpaceBetweenContainer } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const SetupMenuScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [difficulty, setDifficulty] = useState('Beginner');

  return ( 
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>

      {/* Container for setup menu buttons */}
        <View style={styles.section}>
          <SpaceBetweenContainer
            onPress={() => router.push('/settings-theme')}
          >
            <View style={styles.leftContent}>
              <Ionicons name="people-outline" size={28} color={theme.color} />
              <HeaderText>Difficulty</HeaderText>
            </View>

            <MultiSelect
              options={['Beginner', 'Intermediate', 'Advanced']}
              selectedOption={difficulty}
              onSelect={setDifficulty}
            ></MultiSelect>
          </SpaceBetweenContainer>
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