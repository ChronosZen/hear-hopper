import { useState, useEffect } from "react";
import { HStack } from "@gluestack-ui/themed";
import AnimalCard from "./AnimalCard";
import { Audio } from "expo-av";
import { catIcon, dogIcon, cowIcon, goatIcon, tigerIcon } from "../svg/svgs";

const animalIcons = {
  Cat: catIcon,
  Dog: dogIcon,
  Cow: cowIcon,
  Goat: goatIcon,
  Tiger: tigerIcon,
};

const AnimalChoices = ({ dispatch, userAnswer, quizData, answerState }) => {
  const handleUserSelection = (answer) => {
    dispatch({
      type: "selectAnswer",
      payload: answer,
    });
  };

  useEffect(() => {
    let questionSound;
    let rainSound;
    let playCount = 0;
    let soundInterval;

    async function setupQuestionSound() {
      try {
        if (!questionSound && quizData.sound) {
          const { sound } = await Audio.Sound.createAsync(quizData.sound.file);
          questionSound = sound;
          await questionSound.setVolumeAsync(quizData.sound.volume);
        }
        if (answerState === "waiting" && playCount < 5) {
          await questionSound.replayAsync();
          playCount++;
        }
      } catch (error) {
        console.error("Error setting up question sound:", error);
      }
    }

    async function setupRainSound() {
      try {
        const rainSoundInfo = {
          file: require("../../../assets/audioFiles/training/heavy-rain_sound.wav"),
          volume: 1,
        };
        const { sound } = await Audio.Sound.createAsync(rainSoundInfo.file);
        rainSound = sound;
        await rainSound.setVolumeAsync(rainSoundInfo.volume);
        await rainSound.playAsync();
      } catch (error) {
        console.error("Error setting up rain sound:", error);
      }
    }
    setupRainSound();
    if (answerState === "waiting") {
      soundInterval = setInterval(setupQuestionSound, 2000);
    }

    // Cleanup function
    return () => {
      clearInterval(soundInterval);
      if (questionSound) {
        questionSound.stopAsync();
        questionSound.unloadAsync();
      }
      if (rainSound) {
        rainSound.stopAsync();
        rainSound.unloadAsync();
      }
    };
  }, [answerState, quizData]);

  return (
    <HStack justifyContent="center" gap={8} height={132}>
      {quizData.options?.map((animal) => (
        <AnimalCard
          answerState={answerState}
          key={animal}
          icon={animalIcons[animal]}
          name={animal}
          isActive={userAnswer === animal}
          onPress={() => handleUserSelection(animal)}
        />
      ))}
    </HStack>
  );
};

export default AnimalChoices;
