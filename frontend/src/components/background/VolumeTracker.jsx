import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonText,
  Center,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@gluestack-ui/themed";
import {
  Modal,
  Text,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
} from "@gluestack-ui/themed";
import { VolumeManager } from "react-native-volume-manager";
import * as SecureStore from "expo-secure-store";

export default function VolumeTracker() {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [wantsVolumeChanged, setWantsVolumeChanged] = useState(false);

  console.log("volumeLevel =>",volumeLevel)

  // Disable the native volume toast
  useEffect(() => {
    const disableNativeVolumeToast = async () => {
      try {
        await VolumeManager.showNativeVolumeUI({ enabled: false });
      } catch (error) {
        console.error("Error disabling native volume UI:", error);
      }
    };
    disableNativeVolumeToast();
  }, []);

  // Fetch the volume level from the device's storage
  useEffect(() => {
    const fetchVolumeLevel = () => {
      try {
        const storedVolumeLevel = SecureStore.getItem("volumeLevel");
        if (storedVolumeLevel) {
          setVolumeLevel(parseFloat(storedVolumeLevel));
        } else {
          setWantsVolumeChanged(true);
        }
      } catch (error) {
        console.error("Error fetching volume level:", error);
      }
    };

    fetchVolumeLevel();
  }, []);

  // Set the volume of the device
  const setAppVolume = async () => {
    try {
      await VolumeManager.setVolume(volumeLevel);
    } catch (error) {
      console.error("Error setting volume level:", error);
    }
  };

  // Set the volume of the device as an effect of the volume level state change
  useEffect(() => {
    setAppVolume();
  }, [volumeLevel]);

  // Listen to user attempting to change the volume outside the app's control
  useEffect(() => {
    const volumeListener = VolumeManager.addVolumeListener(async (result) => {
      console.log("current volume =>",volumeLevel)
      console.log("result volume =>",result.volume)
      if (result.volume !== volumeLevel) {
        // Reset the volume level to the value stored in the device's storage
        setAppVolume();
        // Show modal to ask user to change the volume level with
        // app's slider instead of the device's volume buttons
        setWantsVolumeChanged(true);
      } else {
        // Normal case: user changes the volume level with the app's slider
        // Do nothing
      }
    });
    return () => {
      volumeListener.remove();
    };
  }, [volumeLevel]);

  return (
    <Modal isOpen={wantsVolumeChanged}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          {volumeLevel === 0 ? (
            <Text>You need to set an appropriate volume level</Text>
          ) : (
            <Text>Do you want to change the volume level?</Text>
          )}
        </ModalHeader>
        <ModalBody>
          <Text>Please do it here so we can save your preference!</Text>
          <Center h={200}>
          <Slider
            size="md"
            orientation="horizontal"
            value={Math.round(volumeLevel*100)}
            onChange={(value) => {
              try {
                const floatVolume = value / 100;
                SecureStore.setItemAsync(
                  "volumeLevel",
                  floatVolume.toString()
                );
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
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              setWantsVolumeChanged(false);
            }}
          >
            <ButtonText>Done</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
