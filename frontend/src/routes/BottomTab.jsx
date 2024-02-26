import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/TestScreen";
import TrainScreen from "../screens/TrainScreen";
import ExampleScreen from "../screens/ExampleScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProfileScreen from "../screens/AddProfileScreen";

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: true }}>
      <ProfileStack.Screen
        name="MainProfile"
        component={ProfileScreen}></ProfileStack.Screen>
      <ProfileStack.Screen
        name="AddProfile"
        component={AddProfileScreen}></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
      <Tab.Screen name="Train" component={TrainScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      <Tab.Screen name="Example" component={ExampleScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
