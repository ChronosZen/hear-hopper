import { useState } from "react";
import {
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  VStack,
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioLabel,
  CircleIcon,
  Image,
  HStack,
  RadioIcon,
} from "@gluestack-ui/themed";

import { useUser } from "../../context/UserContext";

const ChildModal = ({ setIsModelOpen, isModelOpen, kids }) => {
  const { dispatch, selectedKidId } = useUser();
  const [selectedValue, setSelectedValue] = useState(selectedKidId);

  const handleChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    const selectedKidData = kids.find((kid) => kid._id === selectedValue);
    if (selectedKidData) {
      dispatch({
        type: "changeChild",
        payload: {
          selectedKidId: selectedValue,
          selectedKidImage: selectedKidData.image,
          selectedKidQuizScore: selectedKidData.quizScore,
          selectedKidAudiograms: selectedKidData.audiograms,
        },
      });
    }
    setIsModelOpen(!isModelOpen);
  };
  return (
    <Modal isOpen={isModelOpen}>
      <ModalBackdrop />
      <ModalContent>
        <VStack justifyContent="center" alignItems="center">
          <ModalHeader>
            <Heading size="lg">Switch Child’s Profile</Heading>
            <ModalCloseButton onPress={() => setIsModelOpen(!isModelOpen)}>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <RadioGroup value={selectedValue} onChange={handleChange}>
              {kids.map((kid) => (
                <Radio
                  key={kid._id}
                  value={kid._id}
                  size="md"
                  isInvalid={false}
                  isDisabled={false}>
                  <HStack alignItems="center">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <Image
                      size="sm"
                      borderRadius="$full"
                      source={kid.image}
                      alt={kid.firstName}
                      mr="$2"
                    />
                    <RadioLabel>{kid.firstName}</RadioLabel>
                  </HStack>
                </Radio>
              ))}
            </RadioGroup>
          </ModalBody>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default ChildModal;
