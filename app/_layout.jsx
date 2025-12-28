import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router"; // Define a stack-based navigational layout
import { TouchableOpacity } from 'react-native';
import { ThemeProvider } from '../contexts/ThemeContext'; // Importing theme Context

const RootLayout = () => {
  const router = useRouter();

  return (
    <ThemeProvider>
      {({ theme }) => (
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
          <Stack.Screen name='gameplay' options={{headerTitle: 'Play Poker'}} /> {/* Set the gameplay title to 'Play Poker'*/} 
          <Stack.Screen name='game-review' options={{headerTitle: 'Game Review'}} /> {/* Set the game-review title to 'Game Review'*/}
          <Stack.Screen name='training' options={{headerTitle: 'Training'}} /> {/* Set the training title to 'Training'*/} 
          <Stack.Screen name='settings' options={{headerTitle: 'Settings'}} /> {/* Set the settings title to 'Settings'*/} 
          <Stack.Screen name='settings-text' options={{headerTitle: 'Change Text'}} /> {/* Set the settings-text title to 'Change Text'*/} 
          <Stack.Screen name='settings-theme' options={{headerTitle: 'Change Theme'}} /> {/* Set the settings-theme title to 'Change Theme'*/}
          <Stack.Screen name='setup-menu' options={{headerTitle: 'Setup Menu'}} /> {/* Set the setup-menu title to 'Setup Menu'*/}
        </Stack>
      )}
    </ThemeProvider>
  );
}

export default RootLayout;