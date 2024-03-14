import { Audio } from 'expo-av';

// Check microphone access and recording permission status.
export const checkPermissions = async (dispatch) => {
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
export const requestPermissions = async (dispatch, state) => {
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