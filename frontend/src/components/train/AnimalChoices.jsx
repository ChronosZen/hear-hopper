import { useState, useEffect } from "react";
import { HStack } from "@gluestack-ui/themed";
import AnimalCard from "./AnimalCard";
import { catIcon, dogIcon, cowIcon } from "../svg/svgs";
import { Audio } from "expo-av";

const AnimalChoices = () => {
  const [activeAnimal, setActiveAnimal] = useState(null);
  const animalSounds = [
    {
      name: "cat",
      file: require("../../../assets/audioFiles/training/cat_sound.wav"),
      volume: 0.15,
    },
    {
      name: "cow",
      file: require("../../../assets/audioFiles/training/cow_sound.wav"),
      volume: 0.5,
    },
    {
      name: "goat",
      file: require("../../../assets/audioFiles/training/goat_sound.wav"),
      volume: 0.5,
    },
    {
      name: "tiger",
      file: require("../../../assets/audioFiles/training/tiger_sound.wav"),
      volume: 0.5,
    },
    {
      name: "dog",
      file: require("../../../assets/audioFiles/training/dog_sound.wav"),
      volume: 0.5,
    },
    {
      name: "wind",
      file: require("../../../assets/audioFiles/training/wind_sound.wav"),
      volume: 1,
    },
  ];

  useEffect(() => {
    let soundInterval;
    let playCount = 0;
    let catSound;

    async function playSound() {
      const catSoundInfo = animalSounds.find((a) => a.name === "cat");
      if (catSoundInfo) {
        if (!catSound) {
          const { sound } = await Audio.Sound.createAsync(catSoundInfo.file);
          catSound = sound;
          catSound.setVolumeAsync(catSoundInfo.volume);
        }
        await catSound.replayAsync();
        playCount++;
        if (playCount >= 5) {
          clearInterval(soundInterval);
        }
      }
    }

    soundInterval = setInterval(playSound, 1500);

    let windSound;
    async function playWindSound() {
      const windSoundInfo = animalSounds.find((a) => a.name === "wind");
      if (windSoundInfo) {
        const { sound } = await Audio.Sound.createAsync(windSoundInfo.file);
        windSound = sound;
        await windSound.setVolumeAsync(windSoundInfo.volume);
        await windSound.playAsync();
        setTimeout(() => {
          windSound.stopAsync();
        }, 10000);
      }
    }

    playWindSound();
    // Cleanup function to unload sounds and clear intervals when component unmounts
    return () => {
      if (soundInterval) clearInterval(soundInterval);
      catSound?.unloadAsync();
      windSound?.unloadAsync();
    };
  }, []);

  return (
    <HStack justifyContent="center" gap={8} height={132}>
      <AnimalCard
        icon={catIcon}
        name="Cat"
        isActive={activeAnimal === "Cat"}
        onPress={() => setActiveAnimal("Cat")}
      />
      <AnimalCard
        icon={dogIcon}
        name="Dog"
        isActive={activeAnimal === "Dog"}
        onPress={() => setActiveAnimal("Dog")}
      />
      <AnimalCard
        icon={cowIcon}
        name="Cow"
        isActive={activeAnimal === "Cow"}
        onPress={() => setActiveAnimal("Cow")}
      />
    </HStack>
  );
};

export default AnimalChoices;
