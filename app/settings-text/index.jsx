import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { HeaderText, TitleText } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsTextScreen = () => {
  const { theme, setTheme } = useTheme();

  const fonts = [
    {
      font: 'sans-serif',
      name: 'Default'
    },
    {
      font: 'serif',
      name: 'Serif'
    },
    {
      font: 'system-ui',
      name: 'System'
    },
  ];

  const fontSizes = [
    {
      size: 0.8,
      name: 'Small'
    },
    {
      size: 1.0,
      name: 'Default'
    },
    {
      size: 1.2,
      name: 'Large'
    },
  ];

  const selectFont = (font) => {
    setTheme({
      id: theme.id,
      backgroundColor: theme.backgroundColor,
      headerColor: theme.headerColor, 
      color: theme.color,
      font: font,
      fontSize: theme.fontSize,
    });
  };

  const selectFontSize = (fontSize) => {
    setTheme({
      id: theme.id,
      backgroundColor: theme.backgroundColor,
      headerColor: theme.headerColor, 
      color: theme.color,
      font: theme.font,
      fontSize: fontSize,
    });
  };
  
  return (
    // Container uses current font size
    <View style={[styles.container, { backgroundColor: theme.backgroundColor, fontFamily: theme.font }]}>
    
    {/* Title text - uses current theme's font */}
      <View style={{marginBottom: 20}}>
        <TitleText>Select Font</TitleText>
      </View>

      {/* Loop through all fonts and create a button for each one */}
      {fonts.map((font) => (
        <TouchableOpacity
          key={font.font}
          
          // Apply styles - basic style along with fontOption font family, plus selected style if this is the selected font
          style={[
            styles.fontOption,
            theme.font === font.font && styles.selected,
            { borderColor: theme.font === font.font ? '#007AFF' : theme.color, 
              backgroundColor: theme.headerColor
            }
          ]}
          
          // When pressed, call selectFont with this font data
          onPress={() => selectFont(font.font)}
        >
          {/* Format each font's name with it's own font */}
          <View style={styles.leftContent}>
            <HeaderText style={{ fontFamily: font.font }}>
              {font.name}
            </HeaderText>
          </View>

          {/* Right side: Checkmark - only shows if this theme is selected */}
          {theme.font === font.font && (
            <Ionicons name="checkmark-circle" size={28} color="#007AFF" />
          )}
        </TouchableOpacity>
      ))}

      {/* Title text - uses current theme's font size */}
      <View style={{marginBottom: 20}}>
        <TitleText>Select Font Size</TitleText>
      </View>

      {/* Loop through all fonts sizes and create a button for each one */}
      {fontSizes.map((fontSize) => (
        <TouchableOpacity
          key={fontSize.size}
          
          // Apply styles - basic style along with fontOption font family, plus selected style if this is the selected font
          style={[
            styles.fontOption,
            theme.fontSize === fontSize.size && styles.selected,
            { borderColor: theme.fontSize === fontSize.size ? '#007AFF' : theme.color, 
              backgroundColor: theme.headerColor
            }
          ]}
          
          // When pressed, call selectFont with this font data
          onPress={() => selectFontSize(fontSize.size)}
        >
          {/* Format each font's name with it's own font */}
          <View style={styles.leftContent}>
            <HeaderText style={{ fontSize: fontSize.size }}>
              {fontSize.name}
            </HeaderText>
          </View>

          {/* Right side: Checkmark - only shows if this theme is selected */}
          {theme.fontSize === fontSize.size && (
            <Ionicons name="checkmark-circle" size={28} color="#007AFF" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fontOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    minHeight: 72,
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

export default SettingsTextScreen;