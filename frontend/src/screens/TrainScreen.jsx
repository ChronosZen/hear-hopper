import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoiseChecker from "../components/user/NoiseChecker";

const TrainScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Train!</Text>
      <NoiseChecker />
    </View>
  );
};

export default TrainScreen;

const styles = StyleSheet.create({});
