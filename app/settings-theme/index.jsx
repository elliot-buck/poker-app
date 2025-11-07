import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { HeaderText, TitleText } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsThemeScreen = () => {
  // Get the current theme and the function to update it
  const { theme, setTheme } = useTheme();

  console.log(theme.id)

  // Array of all available themes
  // Each theme is an object containing:
  // - name: Display name shown to the user
  // - id: Unique identifier used to track which is selected
  // - backgroundColor: Color for screen backgrounds
  // - headerColor: Color for header/navigation bar
  // - color: Color for text and borders
  const themes = [
    {
      name: 'Classic',
      id: 'classic',
      icon: 'game-controller-outline',
      backgroundColor: '#06402B',
      headerColor: '#2E6F40', 
      color: '#FFFFFF',
    },
    {
      name: 'Dark',
      id: 'dark',
      icon: 'moon-outline',
      backgroundColor: '#1E1E2E',
      headerColor: '#2A2A3E', 
      color: '#FFFFFF',
    },
    {
      name: 'Light',
      id: 'light',
      icon: 'sunny-outline',
      backgroundColor: '#B8B9C8',
      headerColor: '#E8E9F3', 
      color: '#1A1A2E',
    },
    {
      name: 'Ocean',
      id: 'ocean',
      icon: 'water-outline',
      backgroundColor: '#64748B',
      headerColor: '#3B82F6', 
      color: '#FFFFFF',
    },
    {
      name: 'Sunset',
      id: 'sunset',
      icon: 'partly-sunny-outline',
      backgroundColor: '#8B5E8E',
      headerColor: '#a75318ff', 
      color: '#FFFFFF',
    },
  ];

  // Updates the global theme 
  const selectTheme = (themeData) => {
    setTheme({
      id: themeData.id,
      backgroundColor: themeData.backgroundColor,
      headerColor: themeData.headerColor,
      color: themeData.color,
      font: theme.font,
      fontSize: theme.fontSize
    });
  };

  return (
    // Main container - uses current theme's background color
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      
      {/* Title text - uses current theme's font color */}
      <View style={{marginBottom: 20}}>
        <TitleText>Select Theme</TitleText>
      </View>
      {/* Loop through all themes and create a button for each one */}
      {themes.map((themeOption) => (
        <TouchableOpacity
          key={themeOption.id}
          
          // Apply styles - basic themeOption style along with themeOption colors, plus selected style if this is the selected theme
          style={[
            styles.themeOption,
            theme.id === themeOption.id && styles.selected,
            { borderColor: theme.id === themeOption.id ? '#007AFF' : themeOption.color, 
              backgroundColor: themeOption.headerColor
            }
          ]}
          
          // When pressed, call selectTheme with this theme's data
          onPress={() => selectTheme(themeOption)}
        >
          <View style={styles.leftContent}>
            <Ionicons 
              name={themeOption.icon} 
              size={28} 
              color={themeOption.color} 
            />

            <HeaderText style={{ color: themeOption.color }}>
              {themeOption.name}
            </HeaderText>
          </View>

          {/* Right side: Checkmark - only shows if this theme is selected */}
          {theme.id === themeOption.id && (
            <Ionicons name="checkmark-circle" size={28} color="#007AFF" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,    
  },
  selected: {
    borderColor: '#007AFF',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});

export default SettingsThemeScreen;