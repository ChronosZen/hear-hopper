import { StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import ButtonFunc from "../reusable/ButtonFunc";
import { Typography, Colors } from '../../styles/index';
import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { testEar, heldTestBtn, testBtn } from "../svg/svgs";
import HeaderText from "../reusable/HeaderText";
import CloseButton from "../reusable/CloseButton";
import AnimatedLottieView from 'lottie-react-native'
import SVG from "../svg/SVG";


const TestTutorial = ({navigation}) => {
    const [btnAnimate, setBtnAnimate] = useState(false)

    const startCountDown = () => {
        navigation.navigate("Ear Test")
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
            <VStack flex={1} marginBottom={8}>
                <VStack flex={1}>
                    <VStack>
                        <HStack alignItems='center' justifyContent="space-between">
                            <HeaderText text="Tutorial" xml={testEar} underlineColor={Colors.primary.p5} />
                            <CloseButton navigation={navigation} section={"Noise Check"} />
                        </HStack>
                        <Text style={{...Typography.body.bxl}}>Press and Hold the Button while you hear the beeping sound.</Text>
                    </VStack>
                    <VStack flex={1} justifyContent= 'center' alignItems='center'>
                        {btnAnimate ?
                        <> 
                        <AnimatedLottieView source={require('../animation/ButtonBackgroundRipple.json')} autoPlay style={{width:300, height: 300, position: 'absolute'}} />
                        <SVG xml={heldTestBtn} width={150} height={150} />
                        </> :
                        <SVG xml={testBtn} width={150} height={150} />}
                        <AnimatedLottieView source={require('../animation/Tap&Hold.json')} autoPlay style={{width:300, height: 300, position: 'absolute', bottom:10}} />
                    </VStack>
                </VStack>
                <VStack style={{marginHorizontal: 12}}>
                    <ButtonFunc text="Start Test" handleOnPress={startCountDown} />
                </VStack>
            </VStack>
        </VStack>
    );
};

export default TestTutorial;

const styles = StyleSheet.create({});
