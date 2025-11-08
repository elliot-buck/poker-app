import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { BodyText, SelectButton, SelectButtonContainer, TitleText } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return ( 
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Section header */}
      <View style={{ marginBottom: 12 }}>
        <TitleText>Display</TitleText>
      </View>

      {/* Container for settings buttons */}
      <SelectButtonContainer>
        <SelectButton 
          onPress={() => router.push('/settings-theme')}
        >
          <View style={styles.leftContent}>
            <Ionicons name="brush-outline" size={20} color={theme.color} />
            <BodyText>Theme</BodyText>
          </View>

          <Ionicons name="chevron-forward-outline" size={20} color={theme.color} />
        </SelectButton>

        <SelectButton
          onPress={() => router.push('/settings-text')}
        >
          <View style={styles.leftContent}>
            <Ionicons name="document-text-outline" size={20} color={theme.color} />
            <BodyText>Text</BodyText>
          </View>

          <Ionicons name="chevron-forward-outline" size={20} color={theme.color} />
        </SelectButton>
      </SelectButtonContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});

export default SettingsScreen;