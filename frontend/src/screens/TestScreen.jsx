import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from "react-native";
import { useState, useEffect, useReducer } from "react";
import HearingTest from "../components/HearingTest";
import { Audio } from "expo-av";
import { LineChart } from "react-native-chart-kit";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewResults, setViewResults] = useState(false);
  const audioFile = [
    { uri: "../../assets/audioFiles/1000hz.wav", volume: 0.8 },
    { uri: "../../assets/audioFiles/2000hz.wav", volume: 0.5 },
    { uri: "../../assets/audioFiles/5000hz.wav", volume: 0.7 },
    { uri: "../../assets/audioFiles/8000hz.wav", volume: 0.8 }
  ];

  function countDown() {
    if (state.count > 0) {
      const interval = setInterval(() => {
        dispatch({ type: "dec" });

        if (state.count === 1) {
          clearInterval(interval);
          playSound();
        }
      }, 1000);
    } else {
      dispatch({ type: "set" });
    }
  }

  async function loadSound() {
    // console.log("uri: ", uri, " vol: ", volume);
    const { sound } = await Audio.Sound.createAsync(
      require(`../../assets/audioFiles/2000hz.wav`)
    );
    await sound.setVolumeAsync(0.8);

    setSound(sound);
  }

  async function playSound() {
    if (!sound) {
      await loadSound();
    }
    if (!isPlaying && sound) {
      await sound.playAsync();
    } else {
      await sound.stopAsync();
    }
    setIsPlaying(play => !play);
  }

  function refreshPage() {
    setcountPress(false);
    setViewResults(false);
    dispatch({ type: "set" });
  }

  useEffect(() => {
    loadSound()
  },[])

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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: "center" }}>Test starts in</Text>
                <Text style={styles.countDownText}>{state.count}</Text>
              </View>
            ) : (
              <>
                {viewResults ? (
                  <View style={{ flex: 1 }}>
                    <View style={styles.spacingView}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          margin: 12,
                          fontSize: 30
                        }}
                      >
                        Test Results
                      </Text>
                    </View>

                    {/* Ear results */}
                    <View
                      style={
                        (styles.spacingView,
                        {
                          flexDirection: "row",
                          justifyContent: "space-around"
                        })
                      }
                    >
                      <View>
                        <Text>Left Ear</Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "center"
                          }}
                        >
                          95
                        </Text>
                      </View>
                      <View>
                        <Text>Right Ear</Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "center"
                          }}
                        >
                          95
                        </Text>
                      </View>
                    </View>

                    <View style={styles.spacingView}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "500",
                          paddingVertical: 24
                        }}
                      >
                        Excellent Hearing
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#D1D1D1",
                        flex: 1,
                        justifyContent: "space-between",
                        padding: 20,
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>Audiogram</Text>
                      {/* Audio Chart */}
                      <View>
                        <LineChart
                          data={{
                            labels: [500, 1000, 2000, 3000, 6000, 8000],
                            datasets: [
                              {
                                data: [
                                  40,
                                  30,
                                  50,
                                  40,
                                  10,
                                  30
                                ]
                              }
                            ]
                          }}
                          width={Dimensions.get("window").width - 50}
                          height={200}
                          xAxisLabel="Hz"
                          yAxisSuffix="dB"
                          yAxisInterval={1}
                          chartConfig={{
                            backgroundColor: "#4900E5",
                            backgroundGradientFrom: "#4900E5",
                            backgroundGradientTo: "#4900E5",
                            decimalPlaces: 2,
                            color: (opacity = 1) =>
                              `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) =>
                              `rgba(255, 255, 255, ${opacity})`,
                            style: {
                              borderRadius: 16
                            },
                            propsForDots: {
                              r: "6",
                              strokeWidth: "2",
                              stroke: "#ffa726"
                            }
                          }}
                          bezier
                          style={{
                            marginVertical: 8,
                            borderRadius: 16
                          }}
                        />
                      </View>

                      <Button
                        title="View Previous Results"
                        onPress={() => setViewResults(false)}
                      />
                    </View>
                  </View>
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
                        }}>
                        <TouchableOpacity
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
                    </View>
                    <Button
                      title={isPlaying ? "Stop" : "Start Playing"}
                      onPress={playSound}
                    />
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
