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
  HStack,
  View,
  VStack,
} from "@gluestack-ui/themed";
import ButtonFunc from "../reusable/ButtonFunc";
import { VolumeManager } from "react-native-volume-manager";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import { Colors, Spacing, Typography } from "../../styles";
import HeaderText from "../reusable/HeaderText";
import SVG from "../svg/SVG";
import { parentalControlIcon,closeIcon } from "../../components/svg/svgs";
import { Pressable } from "react-native";

export default function VolumeControl({
  goToScreen,
  buttonPrompt,
  backToNoise,
}) {
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
    <View paddingHorizontal={Spacing.l}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="center" space="md">
          <SVG xml={parentalControlIcon} width="40" height="40" />
          <HeaderText
            text="Volume Setting"
            underlineColor={Colors.secondary.g5}
            textAlign="left"
          />
        </HStack>
        {backToNoise && (
          <Pressable
            onPress={() => {
              navigation.navigate("Noise Check");
            }}
          >
            <SVG xml={closeIcon} width="40" height="40"></SVG>
          </Pressable>
        )}
      </HStack>
      <VStack alignItems="center" space="lg">
        <Text style={{ ...Typography.body.bl }}>
          We will set and lock the app's volume here
        </Text>
        <Center w={300} h={300}>
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
              <SliderFilledTrack bg={Colors.primary.p2} />
            </SliderTrack>
            <SliderThumb bg={Colors.primary.p2} />
          </Slider>
        </Center>
        <Text
          textAlign="center"
          marginVertical={48}
          style={{ ...Typography.body.bl }}
        >
          Use the slide bar above to adjust the volume to a comfortable level
          for the sound you are currently hearing.
        </Text>
      </VStack>
      <ButtonFunc
        handleOnPress={() => {
          navigation.navigate(goToScreen);
        }}
        text={buttonPrompt}
        size="lg"
      />
    </View>
  );
}
