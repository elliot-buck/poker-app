import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BodyText, TitleText } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return ( 
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Section header */}
      <View style={{ marginBottom: 20 }}>
        <TitleText style={{ marginBottom: 20 }}>Display</TitleText>
      </View>

      {/* Container for settings buttons */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.preference, { backgroundColor: theme.headerColor, borderColor: theme.color }]}
          onPress={() => router.push('/settings-theme')}
        >
          <BodyText>Theme</BodyText>
          <Ionicons name="chevron-forward-outline" size={18} color={theme.color} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.preference, { backgroundColor: theme.headerColor, borderColor: theme.color }]}
          onPress={() => router.push('/settings-text')}
        >
          <BodyText>Text</BodyText>
          <Ionicons name="chevron-forward-outline" size={18} color={theme.color} />
        </TouchableOpacity>
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
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2, 
  },
});

export default SettingsScreen;