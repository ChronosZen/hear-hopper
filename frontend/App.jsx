import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./src/routes/BottomTab";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <BottomTab />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Log in">
            {(props) => (
              <LoginScreen {...props} setIsSignedIn={setIsSignedIn} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Sign up">
            {(props) => <SignUpScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
