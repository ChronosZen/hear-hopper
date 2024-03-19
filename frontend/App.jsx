import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./src/routes/BottomTab";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import {
  useFonts,
  Outfit_400Regular,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";
import {
  SplineSans_300Light,
  SplineSans_400Regular,
  SplineSans_500Medium,
  SplineSans_600SemiBold,
  SplineSans_700Bold,
} from "@expo-google-fonts/spline-sans";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProfileScreen from "./src/screens/AddProfileScreen";
import { UserProvider } from "./src/context/UserContext";
const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState({});
  let [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
    SplineSans_400Regular,
    SplineSans_500Medium,
    SplineSans_600SemiBold,
    SplineSans_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          {isSignedIn ? (
            <UserProvider>
              <BottomTab userData={userData} />
              </UserProvider>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Log in">
                {(props) => (
                  <LoginScreen {...props} setIsSignedIn={setIsSignedIn} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Sign up">
                {(props) => (
                  <SignUpScreen {...props} setIsSignedIn={setIsSignedIn} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Add Profile">
                {(props) => <AddProfileScreen {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </GluestackUIProvider>
    </QueryClientProvider>
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
