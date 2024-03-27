import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
// import CountDown from "../components/hearingTest/CountDown";
import ButtonFunc from "../reusable/ButtonFunc";
import { Typography, Colors } from '../../styles/index';
import { VStack, HStack } from "@gluestack-ui/themed";
import SVG from "../svg/SVG";
import { testIcon, ear } from "../svg/svgs";
// import CountDown from "./CountDown";

const countDownReducer = (state, action) => {
    switch(action.type){
        case 'dec':
            return {count: state.count-1}
        default:
            return state
    }
}

const TestTutorial = ({navigation}) => {
    const [state, dispatch] = useReducer(countDownReducer, {count: 3})
    const [showCountDown, setShowCountDown] = useState(false)
    
    const startCountDown = () => {
        setShowCountDown(true)

        navigation.navigate("Ear Test")
        setShowCountDown(false)
    }
  
    return (
        <>
        {!showCountDown ? 
        <VStack flex={1} marginHorizontal={12} marginBottom={32}>
            <VStack flex={1} alignItems='center' marginVertical={12}>
                <VStack marginHorizontal={24}>
                    <HStack alignItems='center'>
                        <SVG xml={ear} width="32" height="32" />
                        <Text style={Typography.heading.h2}> Tutorial</Text>
                    </HStack>
                    <Text style={styles.tutorialText}>Press and Hold the Button while you hear the beeping sound.</Text>
                </VStack>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <TouchableOpacity style={{width:116, height: 116, borderRadius: 58, backgroundColor: Colors.primary.p2, justifyContent:'center', alignItems: 'center'}}>
                        <SVG xml={testIcon} width="48" height="48" fill={Colors.primary.p5} />
                    </TouchableOpacity>
                </View>
            </VStack>
            <View style={{marginHorizontal: 12}}>
                <ButtonFunc text="Start Test" handleOnPress={startCountDown} />
            </View>
        </VStack> 
        :
        <VStack style={{flex:'1'}} justifyContent='center' align='center' backgroundColor='pink'>
            <Text style={styles.startCountText}>Test starts in</Text>
            <Text style={Typography.heading.h1}>{state.count}</Text>
        </VStack>
        }
        </>
    );
};

export default TestTutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: 12
  },
  startCountText: {
      textAlign: 'center',
      ...Typography.heading.h3
  },
  tutorialText: {
      marginTop: 16,
      ...Typography.body.bxl
  }
});
