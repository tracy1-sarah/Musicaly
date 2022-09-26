import { NavigationContainer } from "@react-navigation/native";
import AudioProvider from "./app/context/AudioProvider";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AudioProvider>
  );
}


