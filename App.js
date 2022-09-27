import { NavigationContainer } from "@react-navigation/native";
import AudioProvider from "./app/context/AudioProvider";
import AppNavigator from "./app/navigation/AppNavigator";
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>   
       
                <AudioProvider>
                  <NavigationContainer>
                    <AppNavigator />
                  </NavigationContainer>
                </AudioProvider>
              
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


