import {
  HStack,
  Progress,
  ProgressFilledTrack,
  VStack,
} from "@gluestack-ui/themed";
import { Text, View } from "react-native";
import { Colors } from "../../styles";
const ProgressBar = () => {
  return (
    <VStack space="md" marginBottom={48}>
      <Progress value={20} w="100%" h={12} bg={Colors.gs.gs6}>
        <ProgressFilledTrack h={12} bg={Colors.gs.black} />
      </Progress>
      <HStack justifyContent="space-between" width={"100%"}>
        <Text>Progress</Text>
        <Text>01/05</Text>
      </HStack>
    </VStack>
  );
};

export default ProgressBar;
