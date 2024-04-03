import { useEffect, useState } from "react";
import {
  CloseIcon,
  Icon,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Modal,
  Text,
} from "@gluestack-ui/themed";
import ButtonFunc from "../reusable/ButtonFunc";
import { VolumeManager } from "react-native-volume-manager";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

export default function VolumeListenerModal() {
  const [wantsVolumeChanged, setWantsVolumeChanged] = useState(false);

  const navigation = useNavigation();

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

  // Listen to user attempting to change the volume outside the app's control
  useEffect(() => {
    const volumeListener = VolumeManager.addVolumeListener(async (result) => {
      const storedVolumeLevel = await SecureStore.getItem("volumeLevel");
      if (storedVolumeLevel) {
        const volumeLevel = parseFloat(storedVolumeLevel);
        console.log("current volume =>", volumeLevel);
        console.log("result volume =>", result.volume);
        if (result.volume !== volumeLevel) {
          // Reset the volume level to the value stored in the device's storage
          await VolumeManager.setVolume(volumeLevel);
          // Show modal to ask user to change the volume level with
          // app's slider instead of the device's volume buttons
          setWantsVolumeChanged(true);
        } else {
          // Normal case: user changes the volume level with the app's slider
          // Do nothing
        }
      } else {
        // Do nothing since user doesn't have any stored volume level yet
      }
    });

    return () => {
      volumeListener.remove();
    };
  }, []);

  return (
    <Modal isOpen={wantsVolumeChanged}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" textAlign="center">
            Volume change
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>
            The volume of this device is controlled in “Volume Setting” in
            Parental controls. If you want to change the volume, please go to
            the page.
          </Text>
        </ModalBody>
        <ModalFooter>
          <ButtonFunc
            handleOnPress={() => {
              setWantsVolumeChanged(false);
              navigation.navigate("Parental Control Volume Setting");
            }}
            text="Go to Volume Setting"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
