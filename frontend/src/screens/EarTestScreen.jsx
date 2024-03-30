import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
import { Audio } from "expo-av";
import {
  HStack,
  VStack,
  Progress,
  ProgressFilledTrack,
  Pressable,
} from "@gluestack-ui/themed";
import SVG from "../components/svg/SVG";
import HeaderText from "../components/reusable/HeaderText";
import {
  testIcon,
  mainMastcot,
  happyMascot,
  testEar,
  testBtn,
  heldTestBtn,
} from "../components/svg/svgs";
import { Typography, Colors } from "../styles/index";
import ButtonFunc from "../components/reusable/ButtonFunc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import * as secureStorage from 'expo-secure-store';
import CloseButton from "../components/reusable/CloseButton";
import AnimatedLottieView from 'lottie-react-native'


const EarTestScreen = ({ navigation }) => {
  const [nextEar, setnextEar] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState(null);
  // const [audioPanValu, setaudioPanValu] = useState(-1.0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [btnActive, setBtnActive] = useState(false);
  const { selectedKidId } = useUser();
  const [response, setResponse] = useState({
    "500hz": 80,
    "1000hz": 80,
    "2000hz": 80,
    "5000hz": 80,
    "8000hz": 80,
  });
  const [rightResponse, setRightResponse] = useState({
    "500hz": 80,
    "1000hz": 90,
    "2000hz": 70,
    "5000hz": 80,
    "8000hz": 70,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      return fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/audiogram`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${await secureStorage.getItemAsync('JwtToken')}`,
        },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["myData"] });
      response.json().then((data) => {
        console.log("checking for response")
        navigation.navigate("Test Result", {data:data, screenName:'TestScreen'});
      });
    },
  });

  const audioPlay = [
    {
      uri: require("../../assets/audioFiles/0hz.wav"),
      freq: "0hz",
      volume: 0,
    },
    {
      uri: require("../../assets/audioFiles/500hz.wav"),
      freq: "500hz",
      volume: 0.8,
    },
    {
      uri: require("../../assets/audioFiles/500hz.wav"),
      freq: "500hz",
      volume: 0.6,
    },
    {
      uri: require("../../assets/audioFiles/500hz.wav"),
      freq: "500hz",
      volume: 0.4,
    },
    {
      uri: require("../../assets/audioFiles/500hz.wav"),
      freq: "500hz",
      volume: 0.2,
    },
    {
      uri: require("../../assets/audioFiles/500hz.wav"),
      freq: "500hz",
      volume: 0.1,
    },
    {
      uri: require("../../assets/audioFiles/500hz.wav"),
      freq: "500hz",
      volume: 0.1,
    },
    {
      uri: require("../../assets/audioFiles/0hz.wav"),
      freq: "0hz",
      volume: 0,
    },
    {
      uri: require("../../assets/audioFiles/1000hz.wav"),
      freq: "1000hz",
      volume: 0.8,
    },
    {
      uri: require("../../assets/audioFiles/1000hz.wav"),
      freq: "1000hz",
      volume: 0.6,
    },
    {
      uri: require("../../assets/audioFiles/1000hz.wav"),
      freq: "1000hz",
      volume: 0.4,
    },
    {
      uri: require("../../assets/audioFiles/1000hz.wav"),
      freq: "1000hz",
      volume: 0.2,
    },
    {
      uri: require("../../assets/audioFiles/1000hz.wav"),
      freq: "1000hz",
      volume: 0.1,
    },
    {
      uri: require("../../assets/audioFiles/0hz.wav"),
      freq: "0hz",
      volume: 0,
    },
    {
      uri: require("../../assets/audioFiles/2000hz.wav"),
      freq: "2000hz",
      volume: 0.6,
    },
    {
      uri: require("../../assets/audioFiles/2000hz.wav"),
      freq: "2000hz",
      volume: 0.5,
    },
    {
      uri: require("../../assets/audioFiles/2000hz.wav"),
      freq: "2000hz",
      volume: 0.3,
    },
    {
      uri: require("../../assets/audioFiles/2000hz.wav"),
      freq: "2000hz",
      volume: 0.2,
    },
    {
      uri: require("../../assets/audioFiles/2000hz.wav"),
      freq: "2000hz",
      volume: 0.1,
    },
    {
      uri: require("../../assets/audioFiles/0hz.wav"),
      freq: "0hz",
      volume: 0,
    },
    {
      uri: require("../../assets/audioFiles/5000hz.wav"),
      freq: "5000hz",
      volume: 0.7,
    },
    {
      uri: require("../../assets/audioFiles/5000hz.wav"),
      freq: "5000hz",
      volume: 0.5,
    },
    {
      uri: require("../../assets/audioFiles/5000hz.wav"),
      freq: "5000hz",
      volume: 0.3,
    },
    {
      uri: require("../../assets/audioFiles/5000hz.wav"),
      freq: "5000hz",
      volume: 0.2,
    },
    {
      uri: require("../../assets/audioFiles/5000hz.wav"),
      freq: "5000hz",
      volume: 0.1,
    },
    {
      uri: require("../../assets/audioFiles/0hz.wav"),
      freq: "0hz",
      volume: 0,
    },
    {
      uri: require("../../assets/audioFiles/8000hz.wav"),
      freq: "8000hz",
      volume: 0.5,
    },
    {
      uri: require("../../assets/audioFiles/8000hz.wav"),
      freq: "8000hz",
      volume: 0.4,
    },
    {
      uri: require("../../assets/audioFiles/8000hz.wav"),
      freq: "8000hz",
      volume: 0.3,
    },
    {
      uri: require("../../assets/audioFiles/8000hz.wav"),
      freq: "8000hz",
      volume: 0.2,
    },
    {
      uri: require("../../assets/audioFiles/8000hz.wav"),
      freq: "8000hz",
      volume: 0.1,
    },
    {
      uri: require("../../assets/audioFiles/0hz.wav"),
      freq: "0hz",
      volume: 0,
    },
  ];

  // playing the audio in sequence
  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          // console.log('when is loaded and didJustFinish are true');
          nextAudio();
        }
      });
    } else {
      playAudio();
    }

    return () => {
      if (sound && nextEar === 6) {
        sound.setOnPlaybackStatusUpdate(null); // Remove the event listener if component is still mounted
      }
    };
  }, [sound, nextEar]);

  //loading and playing the audio
  const playAudio = async () => {
    // console.log("playaudio called", currentIndex);
    if (sound) {
      //   console.log("if sound");
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      audioPlay[currentIndex].uri,
      { shouldPlay: true, volume: audioPlay[currentIndex].volume }
    );
    newSound.setVolumeAsync(audioPlay[currentIndex].volume, "-1.0");
    setSound(newSound);
    // sound.stopAsync();
    if (
      currentIndex !== 0 &&
      (currentIndex%6 === 0 ||
        currentIndex === (audioPlay.length-1))
    ) {
      if (progress < 5) {
        // console.log("check the audio intervals")
        setProgress((prev) => {
          return prev + 1;
        });
      }
      setnextEar((next) => {
        return next + 1;
      });
    }
  };

  //incrementing the index value to play next audio in array
  const nextAudio = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex + 1;
    });
    if (currentIndex <= audioPlay.length - 1) {
      // console.log('inside nextAudio...:', currentIndex)
      playAudio();
    }
    //playAudio();
  };

  // user response while listening to audio played
  const userResponse = () => {
    // console.log("user is able to hear: ", audioPlay[currentIndex].freq, currentIndex);
    setBtnActive(true)
    if (audioPlay[currentIndex].volume > 0) {
      const db = volTodBCal(audioPlay[currentIndex].volume);
      setResponse((prevResp) => ({
        ...prevResp,
        [audioPlay[currentIndex].freq]: db,
      }));
      // setRightResponse((rightResp) => ({
      //   ...rightResp,
      //   [audioPlay[currentIndex].freq]: db + 10,
      // }));
    }
    // console.log(response);
  };

  const volTodBCal = (vol) => {
    console.log("volume to dB ", vol);
    return vol * 50;
  };

  const btnReleased = () => {
    setBtnActive(false)
  }

  return (
    <VStack flex={1} m={24}>
      <HStack justifyContent="space-between" alignItems="center">
        <HeaderText text="Left Ear" xml={testEar} underlineColor={Colors.primary.p5} />
        <CloseButton navigation={navigation} section={"Tutorial"} />
      </HStack>
      <VStack space="md" marginBottom={12}>
        <Progress value={progress * 20} w="100%" h={12} bg={Colors.gs.gs6}>
          <ProgressFilledTrack h={12} bg={Colors.gs.black} />
        </Progress>
        <HStack justifyContent="space-between" width={"100%"}>
          <Text>Progress</Text>
          <Text>0{progress}/05</Text>
        </HStack>
      </VStack>

      {nextEar < 6 ? (
        <VStack
          flex={1}
          alignItems="center"
          justifyContent="space-between"
          my={80}>
          <VStack alignItems="center">
            <SVG xml={mainMastcot} width="180" height="180" />
            <View>
              <Text style={styles.instructText}>
                Press and Hold the Button while you hear the beeping sound.
              </Text>
            </View>
          </VStack>
          <Pressable onPressIn={userResponse} onPressOut={btnReleased} >
            {btnActive ? 
            <VStack justifyContent="center" alignItems="center">
              <AnimatedLottieView source={require('../components/animation/ButtonBackgroundRipple.json')} autoPlay style={{width:400, height: 400, position: 'absolute'}} />
              <SVG xml={heldTestBtn} width={150} height={150} />
            </VStack>
            :
              <SVG xml={testBtn} width={150} height={150} />
            }
          </Pressable>
        </VStack>
      ) : (
        <VStack justifyContent="space-between" flex={1}>
          <VStack flex={1} space="3xl" alignItems="center" justifyContent="center" marginBottom={12}>
            <SVG xml={happyMascot} width="180" height="180" />
            <AnimatedLottieView source={require('../components/animation/Confetti.json')} autoPlay loop style={{width:400, height: 400, position: 'absolute'}} />
            <Text style={styles.instructText}>
              You Did Great!
            </Text>
          </VStack>

          <ButtonFunc text="View Results" handleOnPress={() => {
            console.log("test result button pressed",selectedKidId)
            mutation.mutate({
              leftEar: response,
              rightEar: rightResponse,
              owner: selectedKidId,
            });
          }} />
        </VStack>
      )}
    </VStack>
  );
};
export default EarTestScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructText: {
    textAlign: "center",
    ...Typography.heading.h3,
  },
});
