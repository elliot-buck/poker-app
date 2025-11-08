import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { BodyText, SelectButton, SelectButtonContainer, TitleText } from '../../components';
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
      <View style={{marginBottom: 12}}>
        <TitleText>Select Font</TitleText>
      </View>

      <SelectButtonContainer>

      {/* Loop through all fonts and create a button for each one */}
      {fonts.map((font) => (
        <SelectButton
          key={font.font}
          
          // Apply styles - basic style plus selected style if this is the selected font
          style={[
            theme.font === font.font && styles.selected,
            { borderColor: theme.font === font.font ? '#007AFF': 'transparent', 
              backgroundColor: theme.headerColor,
            }
          ]}
          
          // When pressed, call selectFont with this font data
          onPress={() => selectFont(font.font)}
        >
          {/* Format each font's name with it's own font */}
          <View style={styles.leftContent}>
            <BodyText style={{ fontFamily: font.font}}>
              {font.name}
            </BodyText>
          </View>

          {/* Right side: Checkmark - only shows if this theme is selected */}
          {theme.font === font.font && (
            <Ionicons name="checkmark-circle" size={28} color="#007AFF" />
          )}
        </SelectButton>
      ))}

      </SelectButtonContainer>

      {/* Title text - uses current theme's font size */}
      <View style={{marginBottom: 12}}>
        <TitleText>Select Font Size</TitleText>
      </View>

      <SelectButtonContainer>

      {/* Loop through all fonts sizes and create a button for each one */}
      {fontSizes.map((fontSize) => (
        <SelectButton
          key={fontSize.size}
          
          // Apply styles - basic style plus selected style if this is the selected font
          style={[
            theme.fontSize === fontSize.size && styles.selected,
            { borderColor: theme.fontSize === fontSize.size ? '#007AFF': 'transparent', 
              backgroundColor: theme.headerColor,
            }
          ]}
          
          // When pressed, call selectFont with this font data
          onPress={() => selectFontSize(fontSize.size)}
        >
          {/* Format each font's name with it's own font */}
          <View style={styles.leftContent}>
            <BodyText style={{ fontSize: fontSize.size * 16 }}>
              {fontSize.name}
            </BodyText>
          </View>

          {/* Right side: Checkmark - only shows if this theme is selected */}
          {theme.fontSize === fontSize.size && (
            <Ionicons name="checkmark-circle" size={28} color="#007AFF" />
          )}
        </SelectButton>
      ))}

      </SelectButtonContainer>
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