import { Audio } from 'expo-av';
import { useReducer, useEffect } from 'react';

// const initialState = {
//     isMicrophonePermGranted: false,
//     isRecordingPermGranted: false,
// }

// const reducer = (state, action) => {
//     switch (action, type) {
//         case "SET_MICROPHONE_PERM_GRANTED":
//             return {
//                 ...state,
//                 isMicrophonePermGranted: action.payload
//             }
//         case "SET_RECORDING_PERM_GRANTED":
//             return {
//                 ...state,
//                 isRecordingPermGranted: action.payload
//             }
//     }
// }

const UserPermissions = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

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

    useEffect(() => {
        checkPermissions()
        if (!state.isMicrophonePermGranted) {
            requestPermissions()
        }
    }, []);

    return state;

}

export default UserPermissions;