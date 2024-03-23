const stopNoiseCheck = async () => {
    try {
        // console.log("check if the recording instance insn't null ->", state.recording)
        if (state.recording !== null) {
            console.log("this is from stopNoiseCheck function and in side of if(state.recording !== null) statement.")
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
            console.log("noiseCheckInterval is cleared? ->", state.noiseLevelUpdateInterval)
        }
    } catch (error) {
        console.error("stopNoiseCheck is Error: ", error)
    }
}