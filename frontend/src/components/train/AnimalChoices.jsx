import { useState, useEffect, useRef } from "react";
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

  const rainSoundRef = useRef(null);
  const feedbackSoundRef = useRef(null);

  useEffect(() => {
    let questionSound;
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
        if (!rainSoundRef.current) {
          const rainSoundInfo = {
            file: require("../../../assets/audioFiles/training/heavy-rain_sound.wav"),
            volume: 0.7,
          };
          const { sound } = await Audio.Sound.createAsync(rainSoundInfo.file);
          rainSoundRef.current = sound;
          await rainSoundRef.current.setVolumeAsync(rainSoundInfo.volume);
          await rainSoundRef.current.playAsync();
        }
      } catch (error) {
        console.error("Error setting up rain sound:", error);
      }
    }
    async function playFeedbackSound() {
      const correctSound = require("../../../assets/audioFiles/training/correct_sound.mp3");
      const wrongSound = require("../../../assets/audioFiles/training/wrong_sound.mp3");
      const soundFile = answerState === "correct" ? correctSound : wrongSound;
      try {
        const { sound } = await Audio.Sound.createAsync(soundFile);
        feedbackSoundRef.current = sound;
        await feedbackSoundRef.current.playAsync();
      } catch (error) {
        console.error("Error playing feedback sound:", error);
      }
    }
    async function stopRainSound() {
      if (rainSoundRef.current) {
        try {
          if (answerState === "correct" || answerState === "wrong") {
            playFeedbackSound();
          }
          await rainSoundRef.current.stopAsync();
          await rainSoundRef.current.unloadAsync();
          rainSoundRef.current = null;
        } catch (error) {
          console.error("Error stopping rain sound", error);
        }
      }
    }

    setupRainSound();
    if (answerState === "waiting") {
      soundInterval = setInterval(setupQuestionSound, 1300);
    } else {
      stopRainSound();
    }

    // Cleanup function
    return () => {
      clearInterval(soundInterval);
      if (questionSound) {
        questionSound.stopAsync();
        questionSound.unloadAsync();
      }
      stopRainSound();
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
          onPress={() => {
            handleUserSelection(animal);
          }}
        />
      ))}
    </HStack>
  );
};

export default AnimalChoices;
