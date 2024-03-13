import { useReducer, useEffect } from "react";
import { Audio } from 'expo-av';
import { View } from "react-native";
import ButtonFunc from "../reusable/ButtonFunc";
import { Colors } from "../../styles";
import { UserPermissions } from "./UserPermissions"
import {
    Heading,
    Text,
    Card
} from '@gluestack-ui/themed';

const initialState = {
    isNoiseChecking: false,
    recording: null,
    noiseLevel: 0,
    noiseLevelUpdateInterval: null,
    isMicrophonePermGranted: false,
    isRecordingPermGranted: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_IS_NOISE_CHECKING":
            return {
                ...state,
                isNoiseChecking: action.payload
            }
        case "SET_RECORDING":
            return {
                ...state,
                recording: action.payload
            }
        case "SET_NOISE_LEVEL":
            return {
                ...state,
                noiseLevel: action.payload
            }
        case "SET_NOISE_LEVEL_UPDATE_INTERVAL":
            return {
                ...state,
                noiseLevelUpdateInterval: action.payload
            }
        case "SET_MICROPHONE_PERM_GRANTED":
            return {
                ...state,
                isMicrophonePermGranted: action.payload
            }
        case "SET_RECORDING_PERM_GRANTED":
            return {
                ...state,
                isRecordingPermGranted: action.payload
            }
        default:
            return state;
    }
}

const NoiseChecker = () => {
    // console.log("Message from NoiseChecker component.") -> OK
    const [state, dispatch] = useReducer(reducer, initialState);

    // const { checkPermissions, requestPermissions } = UserPermissions()

    // Check microphone access and recording permission status.
    const checkPermissions = async () => {
        try {
            const microphonePermission = await Audio.getPermissionsAsync()
            dispatch({ type: "SET_MICROPHONE_PERM_GRANTED", payload: microphonePermission.status === "granted" })
            // console.log("microphone Permissions -> ", microphonePermission.status) // -> OK

            const recordingPermission = await Audio.getPermissionsAsync()
            dispatch({ type: "SET_RECORDING_PERM_GRANTED", payload: recordingPermission.status === "granted" })
            // console.log("recording Permission -> ", recordingPermission.status) // -> OK
        } catch (error) {
            console.error("checkPermissions is Error: ", error)
        }
    }

    // Request microphone and recording access to the first time user or previous denying user .
    const requestPermissions = async () => {
        try {
            if (!state.isMicrophonePermGranted) {
                const newMicrophonePermission = await Audio.requestPermissionsAsync()
                dispatch({ type: "SET_MICROPHONE_PERM_GRANTED", payload: newMicrophonePermission.status === "granted" })
            }

            if (state.isRecordingPermGranted) {
                const newRecordingPermission = await Audio.requestPermissionsAsync()
                dispatch({ type: "SET_RECORDING_PERM_GRANTED", payload: newRecordingPermission.status === "granted" })
            }
        } catch (error) {
            console.error("requestPermissions is Error: ", error)
        }
    }


    let noiseCheckInterval = null
    // console.log("noiseCheckInterval ->", noiseCheckInterval) // -> OK

    // Start noise check
    const startNoiseCheck = async () => {
        try {
            if ((!state.isPermissionGranted) || (!state.isRecordingPermGranted)) {
                requestPermissions()
            }
            if (state.recording !== null) {
                await stopNoiseCheck()
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            // console.log('Starting recording.. and isNoiseChecking ->', state.isNoiseChecking)

            const recordingObj = new Audio.Recording()
            // console.log("this is recording instance -> ", JSON.stringify(recordingObj))

            await recordingObj.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
            await recordingObj.startAsync()

            dispatch({ type: "SET_IS_NOISE_CHECKING", payload: true })
            dispatch({ type: "SET_RECORDING", payload: recordingObj })
            // console.log("check the state of recording after start the recording ->", recordingObj)

            // const recordingStatus = await recordingObj.getStatusAsync();

            const noiseCheckInterval = setInterval(async () => {
                try {
                    // console.log("state.recording from setInterval->", state.recording)
                    if (recordingObj !== null) {
                        const recordingStatus = await recordingObj.getStatusAsync();
                        const meteringDbFS = recordingStatus.metering?.toFixed(1);
                        const floatMeteringDbFS = parseFloat(meteringDbFS)
                        // console.log("recordingStatus in inside of interval ->", recordingStatus);
                        // console.log("recordingStatus.metering", meteringDbFS)

                        dispatch({ type: "SET_NOISE_LEVEL", payload: floatMeteringDbFS })
                    }
                } catch (error) {
                    console.error("noiseCheckInterval is Error: ", error)
                }
            }, 1000)

            dispatch({ type: "SET_NOISE_LEVEL_UPDATE_INTERVAL", payload: noiseCheckInterval })

        } catch (error) {
            console.error("startNoiseCheck is Error: ", error)
        }
    }
    // console.log('Recording started or stopped and isNoiseChecking ->', state.isNoiseChecking);

    const stopNoiseCheck = async () => {
        try {
            // console.log("check if the recording instance insn't null ->", state.recording)

            if (state.recording !== null) {
                // console.log("this is from stopNoiseCheck function and in side of if(state.recording !== null) statement.")
                await state.recording.stopAndUnloadAsync();
                await Audio.setAudioModeAsync(
                    {
                        allowsRecordingIOS: false,
                    }
                )
                dispatch({ type: "SET_IS_NOISE_CHECKING", payload: false })
                dispatch({ type: "SET_RECORDING", payload: null })
                dispatch({ type: "SET_NOISE_LEVEL", payload: 0 })

                clearInterval(state.noiseLevelUpdateInterval)

                dispatch({ type: "SET_NOISE_LEVEL_UPDATE_INTERVAL", payload: null })
                // console.log("noiseCheckInterval is cleared? ->", noiseCheckInterval)
            }
        } catch (error) {
            console.error("stopNoiseCheck is Error: ", error)
        }
    }

    useEffect(() => {
        checkPermissions()
        if (!state.isMicrophonePermGranted) {
            requestPermissions()
        }
    }, [])

    return (
        <>
            <ButtonFunc
                handleOnPress={state.isNoiseChecking ? stopNoiseCheck : startNoiseCheck}
                disabled={!state.isMicrophonePermGranted || !state.isRecordingPermGranted}
                text={state.isNoiseChecking ? "STOP NOISE CHECK" : "START NOISE CHECK"}
            />
            {/* <Text>
                {state.isNoiseChecking
                    ? `Current Noise is ${state.noiseLevel} dB`
                    : ""
                }
            </Text> */}
            {state.isNoiseChecking && (
                <>
                    {
                        state.noiseLevel > -10 && (
                            <Card backgroundColor={Colors.accent.p3} margin={16}>
                                <Heading>High Risk</Heading>
                                <Text>Avoid being in this environment 45 minutes or more.</Text>
                            </Card>
                        )}

                    {state.noiseLevel <= -10 && state.noiseLevel > -12 && (
                        <Card backgroundColor={Colors.accent.y3} margin={16}>
                            <Heading>Moderate Risk</Heading>
                            <Text>Avoid being in this environment 8 hour or more.</Text>
                        </Card>
                    )}

                    {state.noiseLevel <= -12 && (
                        <Card backgroundColor={Colors.secondary.g5} margin={16}>
                            <Heading>Safe</Heading>
                            <Text>No risk of hearing loss, no matter how long you listen.</Text>
                        </Card>
                    )}
                </>
            )}
        </>
    )
}

export default NoiseChecker;

// // Coverts Noise to a decibel
// const amplitudeToDb = amplitude => {
//     try {
//         // console.log("amplitude -> ", amplitude);

//         const decibel = 20 * Math.log10(amplitude);
//         // console.log("decibel -> ", decibel);
//         return decibel.toFixed(2);
//     } catch (error) {
//         console.log("Convert to decible is Error: ", error)
//     }
// };
