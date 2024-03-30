import { useEffect, useState, useRef, useCallback } from "react";
import {
  Button,
  ButtonText,
  Center,
  Text,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Heading,
} from "@gluestack-ui/themed";
import { VolumeManager } from "react-native-volume-manager";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";

export default function VolumeControl({ goToScreen }) {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const navigation = useNavigation();
  const soundRef = useRef();

  console.log("volumeLevel ->", volumeLevel);
  // Fetch the volume level from the device's storage
  useEffect(() => {
    const fetchVolumeLevel = () => {
      try {
        const storedVolumeLevel = SecureStore.getItem("volumeLevel");
        if (storedVolumeLevel) {
          setVolumeLevel(parseFloat(storedVolumeLevel));
        } else {
          setVolumeLevel(0);
        }
      } catch (error) {
        console.error("Error fetching volume level:", error);
      }
    };
    fetchVolumeLevel();
  }, []);

  // Set the volume of the device
  const setAppVolume = () => {
    try {
      VolumeManager.setVolume(volumeLevel);
    } catch (error) {
      console.error("Error setting volume level:", error);
    }
  };

  // Set the volume of the device as an effect of the volume level state change
  useEffect(() => {
    setAppVolume();
  }, [volumeLevel]);

  const playRainSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/audioFiles/training/heavy-rain_sound.wav")
    );
    await sound.setIsLoopingAsync(true);
    soundRef.current = sound;
    console.log("Playing Sound");
    await sound.playAsync();
  };

  useFocusEffect(
    useCallback(() => {
      playRainSound();

      return () => {
        if (soundRef.current) {
          soundRef.current.unloadAsync();
        }
      };
    }, [])
  );

  return (
    <>
      <Heading>Volume Setting</Heading>
      <Text>We will set the app volume</Text>
      <Center w={300} h={400}>
        <Slider
          sliderTrackHeight={8}
          size="lg"
          orientation="horizontal"
          value={Math.round(volumeLevel * 100)}
          onChange={(value) => {
            try {
              const floatVolume = value / 100;
              SecureStore.setItem("volumeLevel", floatVolume.toString());
              // console.log("floatVolume =>",floatVolume);
              setVolumeLevel(floatVolume);
            } catch (error) {
              console.error("Error setting volume level:", error);
            }
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Center>
      <Text textAlign="center" marginVertical={48}>
        Use the slide bar above to adjust the volume to a comfortable level for
        the sound you are currently hearing.
      </Text>

      <Button
        onPress={() => {
          navigation.navigate(goToScreen);
        }}
      >
        <ButtonText>Done</ButtonText>
      </Button>
    </>
  );
}
