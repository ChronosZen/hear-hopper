import { VStack } from "@gluestack-ui/themed";
import { Text, View } from "react-native";
import TrainTopicCard from "./TrainTopicCard";

const TrainSection = ({ navigateFindAnimals }) => {
  return (
    <VStack>
      <TrainTopicCard navigateFindAnimals={navigateFindAnimals} />
    </VStack>
  );
};

export default TrainSection;
