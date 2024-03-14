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
      const questionSoundInfo = quizData.sound;
      if (questionSoundInfo) {
        if (!questionSound) {
          const { sound } = await Audio.Sound.createAsync(
            questionSoundInfo.file
          );
          questionSound = sound;
          await questionSound.setVolumeAsync(questionSoundInfo.volume);
        }
        if (answerState === "waiting") {
          await questionSound.replayAsync();
          playCount++;
        }
      }
    }

    if (answerState === "waiting") {
      soundInterval = setInterval(async () => {
        if (playCount < 5 && answerState === "waiting") {
          await setupQuestionSound();
        } else {
          clearInterval(soundInterval);
          if (questionSound) {
            questionSound.stopAsync();
            questionSound.unloadAsync();
          }
        }
      }, 1500);
    }

    async function setupRainSound() {
      const rainSoundInfo = {
        file: require("../../../assets/audioFiles/training/heavy-rain_sound.wav"),
        volume: 1,
      };
      if (answerState === "waiting") {
        const { sound } = await Audio.Sound.createAsync(rainSoundInfo.file);
        rainSound = sound;
        await rainSound.setVolumeAsync(rainSoundInfo.volume);
        await rainSound.playAsync();
      }
    }

    setupRainSound();

    return () => {
      clearInterval(soundInterval);
      questionSound?.stopAsync();
      questionSound?.unloadAsync();
      rainSound?.stopAsync();
      rainSound?.unloadAsync();
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
