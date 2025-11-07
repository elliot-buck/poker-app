import LogoImage from '@/assets/images/poker-chips-logo.png';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { HeaderText } from '../components';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = () => {
  const router = useRouter(); // Use the router to navigate between pages
  const { theme } = useTheme(); // Getting theme object from context

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Image source={LogoImage} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, {backgroundColor: theme.headerColor, borderColor: theme.color}]} // Defining the button element
          onPress={() => router.push('/gameplay')} // Navigate to the gameplay section
        >
          <HeaderText>Play Poker</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: theme.headerColor, borderColor: theme.color}]}
          onPress={() => router.push('/game-review')} // Navigate to the game review section
        >
          <HeaderText>Game Review</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: theme.headerColor, borderColor: theme.color}]}
          onPress={() => router.push('/training')} // Navigate to the training section
        >
          <HeaderText>Training</HeaderText>
        </TouchableOpacity>
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