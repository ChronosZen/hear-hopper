import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
import { Audio } from "expo-av";
import { HStack, VStack, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import SVG from "../components/svg/SVG";
import HeaderText from "../components/reusable/HeaderText";
import { ear, testIcon, mainMastcot, happyMascot } from "../components/svg/svgs";
import { Typography, Colors } from "../styles/index";
import ButtonFunc from "../components/reusable/ButtonFunc";

const EarTestScreen = ({navigation}) => {

    const [earOpt, setEarOpt] = useState("left")
    const [nextEar, setnextEar] = useState(0)
    const [progress, setProgress] = useState(0);
    const [sound, setSound] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const audioPlay = [
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 2000, volume: 0.5 },
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 2000, volume: 0.3 },
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 2000, volume: 0.8 },
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/2000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 1000, volume: 0.8 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 1000, volume: 0.5 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 1000, volume: 0.2 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/500hz.wav"),freq: 500, volume: 0.7 },
        { uri: require("../../assets/audioFiles/500hz.wav"),freq: 500, volume: 0.4 },
        { uri: require("../../assets/audioFiles/500hz.wav"),freq: 500, volume: 0.3 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/1000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 5000, volume: 0.7 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 5000, volume: 0.4 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 5000, volume: 0.3 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/8000hz.wav"),freq: 8000, volume: 0.4 },
        { uri: require("../../assets/audioFiles/8000hz.wav"),freq: 8000, volume: 0.3 },
        { uri: require("../../assets/audioFiles/8000hz.wav"),freq: 8000, volume: 0.8 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
        { uri: require("../../assets/audioFiles/5000hz.wav"),freq: 0, volume: 0 },
    ];

    const changeEar = () => {
        console.log("clicked")
        // setSound(null)
        setEarOpt("right")
        setCurrentIndex(0);
        setProgress(0)
        setnextEar(0)
        playAudio()
    }

    const navigateToResult = () => {
        console.log("navigate to testresult")
        // navigation.navigate("Test Result")
    }

    useEffect(() => {
        console.log("loading ear test screen: ",earOpt, progress)
    }, [])

    useEffect(() => {
        if (sound) {
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
                // console.log('when is loaded and didJustFinish are true');
              nextAudio();
            }
          });
        }
        else{
          playAudio();
        }
      }, [sound]);

      const playAudio = async () => {
        // console.log('playaudio called')
        if (sound) {
            //   console.log("if sound")
            await sound.unloadAsync();
        }
        if(earOpt === "right"){
            console.log("current index:", currentIndex)

        }
        const { sound: newSound } = await Audio.Sound.createAsync(
            audioPlay[currentIndex].uri,
            { shouldPlay: true, volume: audioPlay[currentIndex].volume }
        );
        setSound(newSound);
        // sound.stopAsync();
        if(currentIndex !== 0 && currentIndex%5 === 0){
            if(progress < 5){
                console.log("check the audio intervals")
                setProgress((prev) => {return prev+1})
            }
            setnextEar((next) => {return next+1})
        }
    };

    const nextAudio = () => {
      setCurrentIndex((prevIndex) =>{return prevIndex + 1});
        if(currentIndex <= audioPlay.length - 1) {
            // console.log('inside nextAudio...:', currentIndex)
            playAudio();
            
        }
      //playAudio();
    };

    return (
        <VStack flex={1} padding={12} backgroundColor='white'>
            <HStack justifyContent="start" alignItems="center" gap={8}>
                <SVG xml={ear} width="24" height="24" />
                <HeaderText text={earOpt==="left" ? "Left Ear" : "Right Ear"} />
            </HStack>
            <VStack space="md" marginBottom={12}>
                <Progress value={progress*20} w="100%" h={12} bg={Colors.gs.gs6}>
                    <ProgressFilledTrack h={12} bg={Colors.gs.black} />
                </Progress>
                <HStack justifyContent="space-between" width={"100%"}>
                    <Text>Progress</Text>
                    <Text>0{progress}/05</Text>
                </HStack>
            </VStack>
            
            {nextEar < 6 ? 
            <VStack flex={1} alignItems='center' justifyContent='space-between' marginVertical={24}>
                <VStack alignItems='center' marginBottom={12} >
                    <SVG xml={mainMastcot} width="180" height="180" />
                    <View>
                        <Text style={styles.instructText}>Press and Hold the Button while you hear the beeping sound.</Text>
                    </View>
                </VStack>
                <TouchableOpacity style={{backgroundColor: Colors.primary.p2, width: 108, height: 108, borderRadius: 54}} onp>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <SVG xml={testIcon} width="48" height="48" fill={Colors.gs.white} />
                    </View>
                </TouchableOpacity>
            </VStack>
            :
            <VStack justifyContent='space-between' flex={1}>
                <VStack alignItems='center' marginBottom={12} >
                    <SVG xml={happyMascot} width="180" height="180" />
                    <View>
                        <Text style={styles.instructText}>{earOpt === "left" ? "Yaay !! Now lets check for Right ear" :"You Did Great!"}</Text>
                    </View>
                </VStack>
                {earOpt === "left" ?
                <ButtonFunc text="Next" handleOnPress={changeEar} /> :
                <ButtonFunc text="View Result" handleOnPress={navigateToResult} />}
            </VStack>
            }
        </VStack>
    );
};
export default EarTestScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructText: {
      textAlign: 'center',
      ...Typography.body.bl
  }
});