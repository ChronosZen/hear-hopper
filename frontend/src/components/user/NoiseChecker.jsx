import React from 'react'; import { Alert, AlertIcon, AlertText, InfoIcon, CheckCircleIcon, CloseCircleIcon, BellIcon, AlertCircleIcon, VStack, Icon } from '@gluestack-ui/themed';
import { Box, Button } from '@gluestack-ui/themed';
import { useReducer, useEffect } from "react";
import { Audio } from 'expo-av';
import { View, Text } from "react-native";
import ButtonFunc from "../reusable/ButtonFunc";

const initialState = {
    isNoiseChecking: false,
    noiseLevel: 0,
    isMicrophonePermGranted: false
};
// console.log("initailState -> ", initialState.isChecking);

// Define how to handle the "state" by each action. 
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_IS_NOISE_CHECKING":
            return {
                ...state,
                isChecking: action.payload
            }
        case "SET_NOISE_LEVEL":
            return {
                ...state,
                noiseLevel: action.payload
            }
        case "SET_MICROPHONE_PERM_GRANTED":
            return {
                ...state,
                isMicrophonePermGranted: action.payload
            }
        default:
            return state;
    }
}

const NoiseChecker = () => {
    // console.log("Message from NoiseChecker component.")

    const [state, dispatch] = useReducer(reducer, initialState);
    let recording = null;

    // Coverts Noise to a decibel
    const amplitudeToDb = amplitude => {
        const decibel = 20 * Math.log10(amplitude);
        console.log("decibel -> ", decibel);
        return decibel.toFixed(2);
    };

    // Check Microphone use permission status using Expo Audio API.
    const checkMicrophonePerm = async() => {
        const { status } = await Audio.getPermissionsAsync()
        dispatch({ type: "SET_MICROPHONE_PERM_GRANTED", payload: status==="granted" })

        console.log("permissioStatus", status)
    }

    // Request Microphone use permission to the first time user using Audio API.
    const requestMicrophonePerm = async() => {
        const  { status } = await Audio.requestPermissionsAsync()
        dispatch({type: "SET_MICROPHONE_PERM_GRANTED", payload: status === "granted"})
    }
    useEffect(() => {
        checkMicrophonePerm()
        if (!state.isMicrophonePermGranted) {
            requestMicrophonePerm()
        }
    }, [])

    // UI (button start and stop the noise check)
    return (
        <Box>
            <ButtonFunc
                // onClick={state.isChecking ? stopRecording : startRecording}
                disabled={!state.isDevicePermissionGranted}
                text={state.isCheking ? "STOP NOISE CHECK" : "START NOISE CHECK"}
            />

            <Text> {state.isChecking
                ? `Current Noise is ${state.noise} DB`
                : ""
            }   </Text>


            {/* <ButtonFunc
                onClick={() => dispatch("START NOISE CHECK")}
                disabled={state.isChecking}
                text="CHECK NOISE LEVEL">
            </ButtonFunc>
            <ButtonFunc
                onClick={() => dispatch("STOP NOISE CHECK")}
                disabled={!state.isChecking}
                text="STOP NOISE CHECK"
            >
            </ButtonFunc> */}
        </Box>
    )
}
export default NoiseChecker;


// useEffect(() => {
//     const {
//         noiseCheck
//     } = state;
//     console.log("noiseCheck -> ", noiseCheck);
//     if (noiseCheck) {
//         const checkNoise = noiseCheck.setOnRecordingStatusUpdata();
//     }
// }, [state.noiseCheck]);