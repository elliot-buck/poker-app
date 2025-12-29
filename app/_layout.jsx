import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from 'react-native';
import AppProviders from '../contexts/AppProviders';
import { useTheme } from '../contexts/ThemeContext';

const LayoutContent = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.headerColor },
        headerTintColor: theme.color,
        headerTitleStyle: { fontFamily: theme.font, fontWeight: 'bold', fontSize: theme.fontSize * 20 },
        contentStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/settings')} style={{ marginRight: 15 }}>
              <Ionicons name="settings-outline" size={24} color={theme.color} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name='gameplay' options={{ headerTitle: 'Play Poker' }} />
      <Stack.Screen name='game-review' options={{ headerTitle: 'Game Review' }} />
      <Stack.Screen name='training' options={{ headerTitle: 'Training' }} />
      <Stack.Screen name='settings' options={{ headerTitle: 'Settings' }} />
      <Stack.Screen name='settings-text' options={{ headerTitle: 'Change Text' }} />
      <Stack.Screen name='settings-theme' options={{ headerTitle: 'Change Theme' }} />
      <Stack.Screen name='setup-menu' options={{ headerTitle: 'Setup Menu' }} />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AppProviders>
      <LayoutContent />
    </AppProviders>
  );
};

export default RootLayout;