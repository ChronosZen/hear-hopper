import { StyleSheet, Text, View } from "react-native";
import React from "react"; // 'useState' import removed as it's not used in this snippet
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ParentalControlScreen from "../screens/ParentalControlScreen";
import ParentalControlNoiseCheckScreen from "../screens/ParentalControlNoiseCheckScreen";
import TestNoiseCheckScreen from "../screens/TestNoiseCheckScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/TestScreen";
import TrainScreen from "../screens/TrainScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProfileScreen from "../screens/AddProfileScreen";
import ExampleScreen from "../screens/ExampleScreen";
import SVG from "../components/svg/SVG";
import {
  homeIcon,
  profileIcon,
  testIcon,
  trainingIcon,
} from "../components/svg/svgs";
import { Colors, Typography } from "../styles";
import TrainSection from "../components/train/TrainSection";
import StartSection from "../components/train/StartSection";
import QuizSection from "../components/train/QuizSection";
import TestTutorial from "../components/hearingTest/TestTutorial";
import EarTestScreen from "../screens/EarTestScreen";
import { useQuery } from "@tanstack/react-query";
import TestResult from "../components/hearingTest/TestResult";

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen({ route }) {

  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: true }}>
      <ProfileStack.Screen
        name="MainProfile"
        initialParams={{ userData }}
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name="AddProfile"
        initialParams={{ userData }}
        component={AddProfileScreen}
      />
      <ProfileStack.Screen name="Example" component={ExampleScreen} />
    </ProfileStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen({ route }) {
  try {
    const { userData } = route.params;
    // console.log("userData from home stack -> ", userData)
    return (
      <HomeStack.Navigator screenOptions={{ headerShown: true }}>
        <HomeStack.Screen
          name="Go back"
          initialParams={{ userData }}
          component={HomeScreen}
        />
        <HomeStack.Screen
          name="ParentalControl"
          component={ParentalControlScreen}
        />
        <HomeStack.Screen
          name="Parental Control Noise Check"
          component={ParentalControlNoiseCheckScreen}
        />
      </HomeStack.Navigator>
    )
  } catch (e) {
    console.log("error from home stack -> ", e)

  }
}

const TrainStack = createNativeStackNavigator();
function TrainStackScreen() {
  return (
    <TrainStack.Navigator screenOptions={{ headerShown: true }}>
      <TrainStack.Screen name="TrainSection" component={TrainScreen} />
      <TrainStack.Screen name="QuizSection" component={QuizSection} />
      <TrainStack.Screen name="StartSection" component={StartSection} />
    </TrainStack.Navigator>
  );
}

const HearinTestStack = createNativeStackNavigator();
function HearingTestStackScreen() {
  return (
    <HearinTestStack.Navigator screenOptions={{ headerShown: true }}>
      <HearinTestStack.Screen name="HearingTest" component={TestScreen} />
      <HearinTestStack.Screen name="Noise Check" component={TestNoiseCheckScreen} />
      <HearinTestStack.Screen name="Tutorial" component={TestTutorial} />
      <HearinTestStack.Screen name="Ear Test" component={EarTestScreen} />
      <HearinTestStack.Screen name="Test Result" component={TestResult} />
    </HearinTestStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["myData"],
    queryFn: () =>
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOCK_JWT}`,
        },
      })
        .then((res) => res.json())
        .then((json) => json.data),
  });

  if (isPending) return  <Text>Loading...</Text>;

  if (error) return <Text>An error has occurred: ${error.message}</Text>;

  const userData = data;
  console.log("Here's the user's kids. You should see this after the query has refetched ->", userData.kids.map(kid => kid.firstName))
  return (
    <Tab.Navigator
      style={styles.tab}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.gs.black,
        tabBarInactiveTintColor: Colors.gs.gs4,
        tabBarStyle: {
          height: 72,
          paddingTop: 11,
          paddingBottom: 11,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        initialParams={{ userData }}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.hNavActive : styles.hNav}>Home</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <SVG
              xml={homeIcon}
              height="24"
              width="24"
              fill={focused ? Colors.gs.black : Colors.gs.gs4}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Test"
        component={HearingTestStackScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.hNavActive : styles.hNav}>Test</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <SVG
              xml={testIcon}
              height="24"
              width="24"
              fill={focused ? Colors.gs.black : Colors.gs.gs4}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Train"
        component={TrainStackScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.hNavActive : styles.hNav}>
              Training
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <SVG
              xml={trainingIcon}
              height="24"
              width="24"
              fill={focused ? Colors.gs.black : Colors.gs.gs4}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        initialParams={{ userData }}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.hNavActive : styles.hNav}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <SVG
              xml={profileIcon}
              height="24"
              width="24"
              fill={focused ? Colors.gs.black : Colors.gs.gs4}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  hNav: {
    ...Typography.heading.nav,
    color: Colors.gs.gs4,
  },
  hNavActive: {
    ...Typography.heading.nav,
    ...Typography.bodyFont.semibold,
    color: Colors.gs.black,
  },
});
