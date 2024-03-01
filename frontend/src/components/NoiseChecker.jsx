import React from 'react'; import { Alert, AlertIcon, AlertText, InfoIcon, CheckCircleIcon, CloseCircleIcon, BellIcon, AlertCircleIcon, VStack, Icon } from '@gluestack-ui/themed';
import { Box, Button } from '@gluestack-ui/themed';
import { useReducer, useEffect } from "react";
import { Audio } from 'expo-av';
// import { Button } from 'react-native-paper';
import { View } from "react-native";
import ButtonFunc from "./reusable/ButtonFunc";

// Define the initialize state
// const initialState = {
//     noise: 0,
//     isChecking: null
// };
console.log("initailState -> ");
console.log("This is from the  NoiseCheking Component");

// Define reducer function
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
    return <View>
        <Button></Button>
        <ButtonFunc /*onClick={handleCheck} disabled={isChecking}*/>
            {/* {isChecking ? 'Checking...' : 'Check noise'} */}
            Check noise
        </ButtonFunc>
        <Box>Noise: db</Box>
    </View>;
};
export default NoiseChecker;