import { VStack } from "@gluestack-ui/themed";
import { Text, View } from "react-native";
import TrainTopicCard from "./TrainTopicCard";
import FutureCard from "./FutureCard";
import { Colors } from "../../styles";
const TrainSection = ({ navigateFindAnimals }) => {
  return (
    <VStack gap={17}>
      <TrainTopicCard navigateFindAnimals={navigateFindAnimals} />
      <FutureCard
        bgColor={Colors.secondary.g6}
        borderColor={Colors.secondary.g5}
        text="Nature Exploration"
      />
      <FutureCard
        bgColor={Colors.accent.b3}
        borderColor={Colors.accent.b2}
        text="Car Sound"
      />
      <FutureCard
        bgColor={Colors.accent.p3}
        borderColor={Colors.accent.p2}
        text="Find Numbers"
      />
    </VStack>
  );
};

export default TrainSection;
