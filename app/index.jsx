import LogoImage from '@/assets/images/poker-chips-logo.png';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from "react-native";
import { CentredButton, HeaderText } from '../components';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = () => {
  const router = useRouter(); // Use the router to navigate between pages
  const { theme } = useTheme(); // Getting theme object from context

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Image source={LogoImage} style={styles.image} />
      <View style={styles.buttonContainer}>
        <CentredButton // Defining the button element
          onPress={() => router.push('/setup-menu')} // Navigate to the game setup menu
        >
          <HeaderText>Play Poker</HeaderText>
        </CentredButton>
        <CentredButton
          onPress={() => router.push('/game-review')} // Navigate to the game review section
        >
          <HeaderText>Game Review</HeaderText>
        </CentredButton>
        <CentredButton
          onPress={() => router.push('/training')} // Navigate to the training section
        >
          <HeaderText>Training</HeaderText>
        </CentredButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  buttonContainer: {
    alignSelf: 'stretch',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  sectionName: {
    fontSize: 18,
    fontWeight: '500',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 50,
  }
});

export default HomeScreen;