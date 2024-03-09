import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
import { Audio } from "expo-av";
import TestResult from "../components/hearingTest/TestResult";
import CountDown from "../components/hearingTest/CountDown";

const countDownReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return { count: 3 };
    case "dec":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const TestScreen = () => {
  const [countPress, setcountPress] = useState(false);
  const [state, dispatch] = useReducer(countDownReducer, { count: 3 });
  const [sound, setSound] = useState();
  const [audioIndex, setAudioIndex] = useState(0);
  const [responseFreq, setResponseFreq] = useState([0, 1000, 2000, 5000, 8000])
  const [responsedB, setResponsedB] = useState([0,0,0,0])
  const [viewResults, setViewResults] = useState(false);
  const audioPlay = [
    { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 2000, volume: 0.5 },
    { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 2000, volume: 0.5 },
    { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 2000, volume: 0.5 },
    { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 2000, volume: 0.5 },
    { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 1000, volume: 0.8 },
    { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 1000, volume: 0.8 },
    { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 1000, volume: 0.8 },
    { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 1000, volume: 0.8 },
    { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 5000, volume: 0.7 },
    { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 5000, volume: 0.7 },
    { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 5000, volume: 0.7 },
    { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 5000, volume: 0.7 },
    { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
    { uri: require("../../assets/audioFiles/8000hz.wav"),freq: 8000, volume: 0.8 },
    { uri: require("../../assets/audioFiles/8000hz.wav"),freq: 8000, volume: 0.8 },
    { uri: require("../../assets/audioFiles/8000hz.wav"),freq: 8000, volume: 0.8 },
    { uri: require("../../assets/audioFiles/8000hz.wav"),freq: 8000, volume: 0.8 },
  ];

  // count down to begin test
  function countDown() {
    if (state.count > 0) {
      const interval = setInterval(() => {
        dispatch({ type: "dec" });

        if (state.count === 1) {
          clearInterval(interval);
        }
      }, 1000);
    } else {
      dispatch({ type: "set" });
    }
  }

  // loading audio file
  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(audioPlay[audioIndex].uri, {
      shouldPlay: true
    });
    setSound(sound);
    sound.setVolumeAsync(audioPlay[audioIndex].volume)
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }

  // playing the loaded audio file
  async function playSound() {
    loadSound()
    if(sound){
        await sound.playAsync();
    }
  }

  const onPlaybackStatusUpdate = async (status) => {
    if(status.didJustFinish){
        setAudioIndex(prev => prev+1)
        if(audioIndex < audioPlay.length && !status.isPlaying){
          playSound()
        }
    }
  };

  function userResponse(){
    if(audioIndex < audioPlay.length){
      console.log("user is able to hear: ",audioPlay[audioIndex].freq)
      if(audioPlay[audioIndex].freq){
        // const audioObj = {
        //   freq: audioPlay[audioIndex].freq, 
        //   db: audioPlay[audioIndex].volume == 0.8 ? 40 :  audioPlay[audioIndex].volume == 0.7 ? 30 : audioPlay[audioIndex].volume == 0.5 ? 20 : 10
        // }
        const db = audioPlay[audioIndex].volume == 0.8 ? 40 :  audioPlay[audioIndex].volume == 0.7 ? 30 : audioPlay[audioIndex].volume == 0.5 ? 20 : 10
        const key = responseFreq.indexOf(audioPlay[audioIndex].freq)
        const audioArr = [...responsedB]
        audioArr[key] = db
        setResponsedB(audioArr)
      }
    }
  }

  function refreshPage() {
    setcountPress(false);
    setViewResults(false);
    dispatch({ type: "set" });
  }

  function displayArray(){
    console.log("display details: ", responseFreq.length, responsedB.length)
    for(let i=0; i<responseFreq.length; i++){
      console.log("freq: ", responseFreq[i])
      console.log("db: ", responsedB[i])
    }
  }

  function prevResults(){
    setViewResults(false)
  }

  console.log("audio index outside")

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 24,
          marginHorizontal: 12
        }}
      >
        <Text style={{ fontWeight: "bold", marginLeft: 12 }}>Hearing Test</Text>
        <Button title="X" onPress={refreshPage} />
      </View>
      <View style={{ flex: 1, marginVertical: 12 }}>
        {countPress ? (
          <>
            {state.count > 0 ? (
              <CountDown count={state.count} />
            ) : (
              <>
                {viewResults ? (
                  <TestResult responseFreq={responseFreq} responsedB={responsedB} prevResults={prevResults} />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-around",
                      marginHorizontal: 24,
                      gap: 6
                    }}
                  >
                    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                      <TouchableOpacity style={{
                          backgroundColor: "#C3ABF6",
                          width: 200,
                          height: 200,
                          borderRadius: 100,
                          alignSelf: "center",
                        }}
                        onPress={userResponse}>
                        <TouchableOpacity
                        onPress={userResponse}
                        style={{
                          backgroundColor: "#4900E5",
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                          margin: 50
                        }}
                      /></TouchableOpacity>
                      <Text style={{ textAlign: "center", fontWeight: "400" }}>
                        Hold the Button and Stop when you can’t hear it.
                      </Text>
                      <Text>{audioIndex}</Text>
                      {/* {audioIndex < audioPlay.length ? <AudioPlay index={audioIndex} onUpdate={indexValues} /> : <Text>Nothing is playing</Text>} */}
                    </View>
                    <Button
                      title="Start Playing"
                      onPress={playSound}
                    />
                    {/* <Button title="Check array of response" onPress={displayArray} /> */}
                    <Button
                      title="View Results"
                      onPress={() => setViewResults(true)}
                    />
                  </View>
                )}
              </>
            )}
          </>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.textCenter}>
              Please wear a Headphone for Accurate Results
            </Text>
            <Button
              title="Start hearing test"
              onPress={() => {
                setcountPress(true);
                countDown();
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: 'pink',
  },
  textCenter: {
    textAlign: "center"
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    margin: 12
  },
  countDownText: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center"
  }
});
