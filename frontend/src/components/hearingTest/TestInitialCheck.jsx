import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import {notification, mainMastcot, speaker, soundIcon} from '../svg/svgs'
import SVG from "../svg/SVG";
import ButtonFunc from "../reusable/ButtonFunc";
import { Typography, Colors } from '../../styles/index';
import { VStack, HStack } from "@gluestack-ui/themed";
import AnimatedLottieView from 'lottie-react-native'
import CloseButton from "../reusable/CloseButton";
const TestInitialCheck = ({navigation}) => {
    const [setting, setSetting] = useState(0)

    function changeSection(){
        if(setting === 1){
            navigation.navigate("Noise Check")
            setSetting(0)
        }
        if(!setting){
            setSetting(1)
        }
    }

    return (
        <VStack flex={1} justifyContent="space-between">
            <HStack m={24} justifyContent="flex-end">
                <CloseButton navigation={navigation} section={"Go back"} />
            </HStack>
            {setting ?
                <>
                    <VStack alignItems="center">
                        {/* <AnimatedLottieView source={require('../animation/NoSoundsFX.json')} autoPlay style={{width:300, height: 300}} /> */}
                        <SVG xml={notification} width={300} height={300} />
                    </VStack>
                    <Text style={{...Typography.heading.h4, textAlign: 'center', marginHorizontal: 32}}>Please make sure to Turn Off any Sound Effects</Text>
                </>
                :
                <>
                    <VStack alignItems="center">
                        <AnimatedLottieView source={require('../animation/Headphones.json')} autoPlay style={{width:300, height: 300}} />
                    </VStack>
                    <Text style={{...Typography.heading.h4, textAlign: 'center', marginHorizontal: 32}}>Please wear a Headphone for Accurate Results</Text>
                </>
                }
            <View style={{marginBottom: 32, marginHorizontal: 24}}>
                <ButtonFunc text="Proceed" handleOnPress={changeSection} />
            </View>
        </VStack>
    );
};

export default TestInitialCheck;

const styles = StyleSheet.create({});
