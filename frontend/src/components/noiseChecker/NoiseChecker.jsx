import { useReducer, useEffect } from "react";
import { Audio } from 'expo-av';
import { View } from "react-native";
import ButtonFunc from "../reusable/ButtonFunc";
import { Colors } from "../../styles";
import { checkPermissions, requestPermissions } from "./UserPermissions";
import { useRoute, useNavigation } from "@react-navigation/native";
import HeaderText from "../reusable/HeaderText";

import {
    Heading,
    Text,
    Card,
    HStack,
    Pressable,
    Icon,
    CloseIcon
} from '@gluestack-ui/themed';

const initialState = {
    isNoiseChecking: false,
    recording: null,
    noiseLevel: null,
    isSafeLevel: false,
    noiseLevelUpdateInterval: null,
    safeDuration: 4,
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
        case "SET_IS_SAFE_LEVEL":
            return {
                ...state,
                isSafeLevel: action.payload
            }
        case "SET_IMCREMENT_SAFE_DURATION":
            return {
                ...state,
                safeDuration: state.safeDuration + action.payload
            }
        case "RESET_SAFE_DURATION":
            return {
                ...state,
                safeDuration: 0
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
    // console.log("route name from noise checker", route.route.route.name)

    const route = useRoute()
    const routeName = route.name
    // console.log("routeName", routeName)

    const navigation = useNavigation()
    // console.log(navigation);

    const [state, dispatch] = useReducer(reducer, initialState);

    // Check microphone access and recording permission status.
    const handleCheckPermissions = async () => {
        await checkPermissions(dispatch)
    }
    // console.log("handleCheckPermission is working ->", state)

    const handleRequestPermissions = async () => {
        await requestPermissions(dispatch, state)
    }

    // Start noise check
    const startNoiseCheck = async () => {
        try {
            if ((!state.isPermissionGranted) || (!state.isRecordingPermGranted)) {
                handleRequestPermissions()
            }
            if (state.recording !== null) {
                await stopNoiseCheck()
                await state.recording.stopAndUnloadAsync();
                dispatch({ type: "SET_RECORDING", payload: null });
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
            dispatch({ type: "RESET_SAFE_DURATION", payload: 0 })
            // console.log("check the state of recording after start the recording ->", recordingObj)

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

                        if (floatMeteringDbFS <= -12) {
                            dispatch({ type: "SET_IMCREMENT_SAFE_DURATION", payload: 1 })
                        } else {
                            dispatch({ type: "RESET_SAFE_DURATION", payload: 0 })
                        }
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
    // console.log("safeDuration ->", state.safeDuration)

    console.log("recording", state.recording)

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
                // console.log("noiseCheckInterval is cleared? ->", state.noiseLevelUpdateInterval)
            }
        } catch (error) {
            console.error("stopNoiseCheck is Error: ", error)
        }
    }

    console.log("isNoiseChecking ->", state.isNoiseChecking)

    useEffect(() => {
        handleCheckPermissions()
        if (!state.isMicrophonePermGranted) {
            handleRequestPermissions()
        }
    }, [])

    return (
        <>
            <HStack space="xl">
                <HeaderText text="Noise Check" />
                {routeName === "Parental Control Noise Check"
                    ? (
                        <>
                            <Pressable onPress={() => {
                                stopNoiseCheck();
                                navigation.navigate("ParentalControl")
                            }}
                            >
                                <Icon as={CloseIcon} m="$2" w="$4" h="$4" />
                            </Pressable>

                            {state.isNoiseChecking === false
                                ?
                                <ButtonFunc
                                    handleOnPress={startNoiseCheck}
                                    disabled={!state.isMicrophonePermGranted || !state.isRecordingPermGranted}
                                    text={"START NOISE CHECK"}
                                />
                                :
                                <></>
                            }
                        </>
                    )
                    :
                    (<Pressable onPress={() => {
                        stopNoiseCheck();
                        navigation.navigate("HearingTest")
                    }}
                    >
                        <Icon as={CloseIcon} m="$2" w="$4" h="$4" />
                    </Pressable>)
                }
            </HStack>
            <Text>We will conduct an Environmental Noise Check before starting the test.</Text>

            {routeName === "Parental Control Noise Check"
                ? (state.isNoiseChecking === false
                    ?
                    <ButtonFunc
                        handleOnPress={startNoiseCheck}
                        disabled={!state.isMicrophonePermGranted || !state.isRecordingPermGranted}
                        text={"START NOISE CHECK"}
                    />
                    :
                    <></>
                )
                :
                <ButtonFunc
                    handleOnPress={() => {
                        state.isNoiseChecking
                            ? (stopNoiseCheck(),
                                navigation.navigate("Tutorial"))
                            : startNoiseCheck();
                    }}
                    isDisabled={!state.isMicrophonePermGranted || !state.isRecordingPermGranted || state.safeDuration < 3}
                    text={state.isNoiseChecking && state.safeDuration > 3 ? "Proceed to Test" : "CHECK"}
                />
            }

            <View>
                <Text> Safeduration {state.safeDuration}</Text>
            </View>

            {
                state.isNoiseChecking && state.noiseLevel && (
                    <>
                        {state.noiseLevel <= -12 && (
                            <Card backgroundColor={Colors.secondary.g5} margin={16}>
                                <Heading>Safe</Heading>
                                <Text>No risk of hearing loss, no matter how long you listen.</Text>
                            </Card>
                        )}
                        {state.noiseLevel <= -10 && state.noiseLevel > -12 && (
                            <Card backgroundColor={Colors.accent.y3} margin={16}>
                                <Heading>Moderate Risk</Heading>
                                <Text>Avoid being in this environment 8 hour or more.</Text>
                            </Card>
                        )}

                        {state.noiseLevel > -10 && (
                            <Card backgroundColor={Colors.accent.p3} margin={16}>
                                <Heading>High Risk</Heading>
                                <Text>Avoid being in this environment 45 minutes or more.</Text>
                            </Card>
                        )}
                    </>
                )
            }
        </>
    )
}

export default NoiseChecker;