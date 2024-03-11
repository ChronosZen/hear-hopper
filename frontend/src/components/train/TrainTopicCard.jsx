import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Typography } from "../../styles";
import { HStack } from "@gluestack-ui/themed";
import SVG from "../svg/SVG";
import { crown } from "../svg/svgs";
const TrainTopicCard = ({ navigateFindAnimals }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigateFindAnimals()}>
      <Text style={styles.h5}>Find Animals</Text>
      <HStack gap={4}>
        <SVG xml={crown} width="16" height="13" />
        <SVG xml={crown} width="16" height="13" />
        <SVG xml={crown} width="16" height="13" />
        <SVG xml={crown} width="16" height="13" />
        <SVG xml={crown} width="16" height="13" />
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
    height: 120,
    borderRadius: 12,
    backgroundColor: Colors.accent.y3,
    padding: 16,
  },
});
