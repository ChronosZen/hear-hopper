import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
import { Audio } from "expo-av";
import { HStack, VStack, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import SVG from "../components/svg/SVG";
import HeaderText from "../components/reusable/HeaderText";
import { ear, happyMascot, testIcon } from "../components/svg/svgs";
import { Typography, Colors } from "../styles/index";
import ButtonFunc from "../components/reusable/ButtonFunc";

const EarTestScreen = ({navigation}) => {
    const [earOpt, setEarOpt] = useState("left")
    const [progress, setProgress] = useState(0)

    function changeEar(){
        console.log("clicked")
        setEarOpt("right")
    }

    useEffect(() => {
        console.log("loading ear test screen: ",earOpt)
    }, [])

    return (
        <VStack flex={1} padding={12} backgroundColor='white'>
            <HStack justifyContent="start" alignItems="center" gap={8}>
                <SVG xml={ear} width="24" height="24" />
                <HeaderText text={earOpt==="left" ? "Left Ear" : "Right Ear"} />
            </HStack>
            <VStack space="md" marginBottom={12}>
                <Progress value={progress} w="100%" h={12} bg={Colors.gs.gs6}>
                    <ProgressFilledTrack h={12} bg={Colors.gs.black} />
                </Progress>
                <HStack justifyContent="space-between" width={"100%"}>
                    <Text>Progress</Text>
                    <Text>00/05</Text>
                </HStack>
            </VStack>
            <VStack flex={1} alignItems='center' justifyContent='space-between' marginVertical={24}>
                <VStack alignItems='center' marginBottom={12} >
                    <SVG xml={happyMascot} width="180" height="180" />
                    <View style={Typography.body.bl }>
                        <Text style={{textAlign: 'center'}}>Press and Hold the Button while you hear the beeping sound.</Text>
                    </View>
                </VStack>
                <TouchableOpacity style={{backgroundColor: Colors.primary.p2, width: 116, height: 116, borderRadius: 58}} onp>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <SVG xml={testIcon} width="48" height="48" fill={Colors.gs.white} />
                    </View>
                </TouchableOpacity>
            </VStack>
                <ButtonFunc text="Next" handleOnPress={changeEar} />
        </VStack>
    );
};

export default EarTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
