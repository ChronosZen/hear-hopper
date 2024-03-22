import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
import { Audio } from "expo-av";
import TestResult from "../components/hearingTest/TestResult";
import CountDown from "../components/hearingTest/CountDown";
import TestInitialCheck from "../components/hearingTest/TestInitialCheck";
import TestTutorial from "../components/hearingTest/TestTutorial";
import { SafeAreaView } from "react-native-safe-area-context";

const TestScreen = ({ navigation }) => {
  // function navigateToTutorial(){
  //   navigation.navigate("Tutorial")
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TestInitialCheck navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center'
    // backgroundColor: 'pink',
  },
});
