import { Stack } from "expo-router"; // Define a stack-based navigational layout for this screen

const TrainingLayout = () => {
  return <Stack 
    screenOptions={{
      headerShown: false, // Remove the secondary header
    }}
  />;
}

export default TrainingLayout;