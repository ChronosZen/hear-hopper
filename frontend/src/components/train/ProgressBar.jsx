import {
  HStack,
  Progress,
  ProgressFilledTrack,
  VStack,
} from "@gluestack-ui/themed";
import { Text, View } from "react-native";
import { Colors, Typography } from "../../styles";
const ProgressBar = ({ question }) => {
  return (
    <VStack space="md" marginBottom={48}>
      <Progress value={20 * (question + 1)} w="100%" h={12} bg={Colors.gs.gs6}>
        <ProgressFilledTrack h={12} bg={Colors.gs.black} />
      </Progress>
      <HStack justifyContent="space-between" width={"100%"}>
        <Text style={Typography.body.bm}>Progress</Text>
        <Text style={Typography.body.bm}>0{question + 1}/05</Text>
      </HStack>
    </VStack>
  );
};

export default ProgressBar;
