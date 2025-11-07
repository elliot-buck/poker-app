import { StyleSheet, Text, View } from "react-native";

const TrainingScreen = () => {
  return ( <View style={styles.container}>
    <Text>Training</Text>
  </View> );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#06402B',
  },
});

export default TrainingScreen;