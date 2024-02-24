import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HearingTest from "../components/HearingTest";

const TestScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Test!</Text>
      <HearingTest />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
