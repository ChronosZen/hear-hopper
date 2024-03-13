import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
// import CountDown from "../components/hearingTest/CountDown";
import ButtonFunc from "../reusable/ButtonFunc";
import { Typography, Colors } from '../../styles/index';
// import CountDown from "./CountDown";

const TestTutorial = ({navigation}) => {
    
    function startCountDown(){
        navigation.navigate("Ear Test")
    }
  
    return (
        <View style={{flex:1, margin: 12}}>
            <View style={styles.container}>
                <Text>Press and Hold the Button while you hear the beeping sound.</Text>
                <TouchableOpacity style={{width:116, height: 116, borderRadius: 58, backgroundColor: Colors.primary.p2}} />
            </View>
            <ButtonFunc text="Start Test" handleOnPress={startCountDown} />
        </View>
    );
};

export default TestTutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: 'center',
    margin: 12
    // backgroundColor: 'pink',
  }
});
