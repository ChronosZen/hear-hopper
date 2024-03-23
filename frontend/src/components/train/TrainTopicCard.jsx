import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Typography } from "../../styles";
import { HStack, VStack } from "@gluestack-ui/themed";
import SVG from "../svg/SVG";
import {
  crown,
  crownWithColor,
  dogIcon,
  catIcon,
  catTrans,
  dogTrans,
} from "../svg/svgs";
import { useUser } from "../../context/UserContext";

const TrainTopicCard = ({ navigateFindAnimals }) => {
  const { selectedKidQuizScore } = useUser();
  const crowns = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= selectedKidQuizScore) {
      crowns.push(
        <SVG key={i} xml={crownWithColor} width="24" height="19.2" />
      );
    } else {
      crowns.push(<SVG key={i} xml={crown} width="24" height="19.2" />);
    }
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigateFindAnimals()}>
      <HStack justifyContent="space-between">
        <VStack alignContent="space-between" gap={40}>
          <Text style={styles.h5}>Find Animals</Text>
          <VStack gap={8}>
            <Text style={styles.bodyFooter}>Previous Score</Text>
            <HStack gap={4}>{crowns}</HStack>
          </VStack>
        </VStack>
        <VStack>
          <View style={{ transform: [{ rotate: "-18deg" }], opacity: 0.55 }}>
            <SVG xml={dogIcon} width={73.5} height={70.7} />
          </View>
          <View
            style={{
              position: "absolute",
              right: 25,
              transform: [{ rotate: "11deg" }],
              opacity: 0.55,
              top: 70,
            }}>
            <SVG xml={catIcon} width={73.5} height={70.7} />
          </View>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default TrainTopicCard;
const styles = StyleSheet.create({
  h5: {
    ...Typography.heading.h5,
    marginBottom: 8,
  },
  card: {
    width: "100%",
    height: 162,
    borderRadius: 12,
    backgroundColor: Colors.accent.y3,
    borderWidth: 1,
    borderColor: Colors.accent.y2,
    padding: 16,
  },
  bodyFooter: {
    ...Typography.body.bl,
    color: Colors.gs.gs3,
  },
});
