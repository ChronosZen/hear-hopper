import React from 'react'; import { Alert, AlertIcon, AlertText, InfoIcon, CheckCircleIcon, CloseCircleIcon, BellIcon, AlertCircleIcon, VStack, Icon } from '@gluestack-ui/themed';
import { Box, Button } from '@gluestack-ui/themed';
import { useReducer, useEffect } from "react";
import { Audio } from 'expo-av';
// import { Button } from 'react-native-paper';
import { View, Text } from "react-native";
import ButtonFunc from "../reusable/ButtonFunc";

const initialState = {
    noise: 0,
    isChecking: false
};
// console.log("initailState -> ", initialState.isChecking);

// Define how to handle the "state" by action. 
const reducer = (state, action) => {
    switch (action.type) {
        case "START NOISE CHECK":
            return {
                ...state,
                isChecking: true
            }
        case "STOP NOISE CHECK":
            return {
                ...state,
                isChecking: false
            }
    }
}





// const reducer = (state, action) => {
//     console.log("state -> ", state);
//     console.log("action -> ", action);
//     switch (action.type) {
//         case 'CHECK_NOIDE':
//             return {
//                 ...state,
//                 isChecking: true
//             };
//         case 'NOISE_CHECKED':
//             return {
//                 ...state,
//                 noise: action.payload,
//                 isChecking: false
//             };
//         case 'UPDATE_NOISE':
//             return {
//                 ...state,
//                 noise: action.payload
//             };
//         default:
//             return state;
//     }
// };
// const sample = () => {
//     <Alert variant={"accent"} action={"success"}>
//         <AlertIcon as={InfoIcon} mr="$3" />
//         <AlertText>
//             Selection successfully moved!
//         </AlertText>
//     </Alert>;
// };

// Main function (Noise Checker)
const NoiseChecker = () => {
    // console.log("Message from NoiseChecker component.")

    const [state, dispatch] = useReducer(reducer, initialState);

    // console.log("NoiseChecker Component is called.");
    // const [state, dispatch] = useReducer(reducer, initialState);
    // console.log("state -> ", state);
    // console.log("dispatch -> ", dispatch);
    // useEffect(() => {
    //     const {
    //         noiseCheck
    //     } = state;
    //     console.log("noiseCheck -> ", noiseCheck);
    //     if (noiseCheck) {
    //         const checkNoise = noiseCheck.setOnRecordingStatusUpdata();
    //     }
    // }, [state.noiseCheck]);

    // Function coverts an amplitude to a decibel
    // const amplitudeToDb = amplitude => {
    //     const decibel = 20 * Math.log10(amplitude);
    //     console.log("decibel -> ", decibel);
    //     return decibel.toFixed(2);
    // };

    // Async function to start the noise check
    // const startNoiseCheck = async () => {
    //     try { } catch (error) {
    //         console.error("Failed to start noise check", error);
    //     }
    // };

    // UI (button start and stop the noise check)
    return (
        <View>
            <Box>
                <Text>
                    {initialState.isChecking ? 'Checking...' : 'Start Noise Check'}</Text>

                <Text> {initialState.isChecking
                    ? `Here is the decibel ${state.noise}`
                    : ""
                }   </Text>
            </Box>
            <ButtonFunc onClick={() => dispatch("START NOISE CHECK")} /*onClick={handleCheck} disabled={isChecking}*/>

            </ButtonFunc>

        </View>
    )
}
export default NoiseChecker;