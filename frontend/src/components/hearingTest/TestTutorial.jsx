import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useReducer, useEffect } from "react";
// import CountDown from "../components/hearingTest/CountDown";
import ButtonFunc from "../reusable/ButtonFunc";
import { Typography, Colors } from '../../styles/index';
import { VStack, HStack } from "@gluestack-ui/themed";
import { testEar, heldTestBtn, testBtn } from "../svg/svgs";
import HeaderText from "../reusable/HeaderText";
import CloseButton from "../reusable/CloseButton";
import AnimatedLottieView from 'lottie-react-native'
import SVG from "../svg/SVG";

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
    const [btnAnimate, setBtnAnimate] = useState(false)
    
    const startCountDown = () => {
        setShowCountDown(true)

        navigation.navigate("Ear Test")
        setShowCountDown(false)
    }

    useEffect(() => {
        const btnReleased = setInterval(() => {
            setBtnAnimate(true)
        }, 1000)

        const btnPressed = setInterval(() => {
            setBtnAnimate(false)
        }, 4000)

        return () => {
            clearInterval(btnReleased)
            clearInterval(btnPressed)
        }
    },[])
  
    return (
        <VStack flex={1} m={24}>
        {!showCountDown ? 
        <VStack flex={1} marginBottom={8}>
            <VStack flex={1} alignItems='center'>
                <VStack>
                    <HStack alignItems='center' justifyContent="space-between">
                        <HeaderText text="Tutorial" xml={testEar} underlineColor={Colors.primary.p5} />
                        <CloseButton navigation={navigation} section={"Noise Check"} />
                    </HStack>
                    <Text style={styles.tutorialText}>Press and Hold the Button while you hear the beeping sound.</Text>
                </VStack>
                <VStack flex={1} justifyContent= 'center' alignItems='center'>
                    {btnAnimate ?
                    <> 
                    <AnimatedLottieView source={require('../animation/ButtonBackgroundRipple.json')} autoPlay style={{width:300, height: 300, position: 'absolute'}} />
                    <SVG xml={heldTestBtn} width={150} height={150} />
                    </> :
                    <SVG xml={testBtn} width={150} height={150} />}
                    <AnimatedLottieView source={require('../animation/Tap&Hold.json')} autoPlay style={{width:300, height: 300, position: 'absolute', bottom:80}} />
                </VStack>
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
        </VStack>
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
      marginVertical: 32,
      ...Typography.body.bxl,
  }
});
