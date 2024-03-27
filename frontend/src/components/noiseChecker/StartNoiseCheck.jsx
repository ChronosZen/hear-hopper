const startNoiseCheck = async () => {
    try {
        if ((!state.isPermissionGranted) || (!state.isRecordingPermGranted)) {
            handleRequestPermissions()
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