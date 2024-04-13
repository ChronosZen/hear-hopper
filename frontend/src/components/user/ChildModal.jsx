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
import { Colors, Typography } from "../../styles/index";
import { useUser } from "../../context/UserContext";
import { StyleSheet, Text, View } from "react-native";

const CustomCircleIcon = (props) => (
  <CircleIcon fill={Colors.primary.p1} {...props} />
);

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
    <Modal
      isOpen={isModelOpen}
      onClose={() => {
        setIsModelOpen(false);
      }}>
      <ModalBackdrop />
      <ModalContent paddingTop={12} paddingBottom={16} width={327}>
        <VStack
          justifyContent="flext-start"
          alignItems="center"
          marginRight={"auto"}>
          <ModalHeader>
            <Text
              style={{
                ...Typography.heading.h4,
                marginBottom: 16,
              }}>
              Switch Child’s Profile
            </Text>
            {/* <ModalCloseButton onPress={() => setIsModelOpen(!isModelOpen)}>
              <Icon as={CloseIcon} />
            </ModalCloseButton> */}
          </ModalHeader>
          <ModalBody marginRight={"auto"}>
            <RadioGroup value={selectedValue} onChange={handleChange} gap={16}>
              {kids.map((kid) => (
                <Radio
                  key={kid._id}
                  value={kid._id}
                  size="md"
                  isInvalid={false}
                  isDisabled={false}>
                  <HStack alignItems="center" justifyContent="flex-start">
                    <RadioIndicator mr="$4">
                      <RadioIcon
                        color={Colors.primary.p1}
                        as={CircleIcon}
                        width={12}
                        height={12}
                      />
                    </RadioIndicator>
                    <Image
                      width={40}
                      height={40}
                      borderRadius="$full"
                      source={kid.image}
                      alt={kid.firstName}
                      mr="$4"
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
