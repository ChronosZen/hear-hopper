import {
  ChevronDownIcon,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  VStack,
} from "@gluestack-ui/themed";
import { useUser } from "../../context/UserContext";
const ChildModal = ({ setIsModelOpen, isModelOpen, kids }) => {
  const { dispatch } = useUser();

  const handleSelectedKid = (selectedValue) => {
    const selectedKidData = kids.find((kid) => kid._id === selectedValue);

    dispatch({
      type: "changeChild",
      payload: {
        selectedKidId: selectedValue,
        selectedKidImage: selectedKidData.image,
        selectedKidQuizScore: selectedKidData.quizScore,
        selectedKidAudiograms: selectedKidData.audiograms,
      },
    });
    setIsModelOpen(!isModelOpen);
  };

  return (
    <Modal isOpen={isModelOpen}>
      <ModalBackdrop />
      <ModalContent>
        <VStack justifyContent="center" alignItems="center">
          <ModalHeader>
            <Heading size="lg">Congratulations!</Heading>
            <ModalCloseButton onPress={() => setIsModelOpen(!isModelOpen)}>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Select onValueChange={(value) => handleSelectedKid(value)}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select children" />
                <SelectIcon mr="$3">
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {kids?.map((kid) => (
                    <SelectItem
                      label={kid.firstName}
                      key={kid._id}
                      value={kid._id}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </ModalBody>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
export default ChildModal;
