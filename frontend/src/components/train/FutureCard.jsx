import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Typography } from "../../styles";
import { HStack, VStack } from "@gluestack-ui/themed";
import SVG from "../svg/SVG";
import { crown, lockIcon } from "../svg/svgs";

const FutureCard = ({ text = "Input name", bgColor, borderColor }) => {
  const crowns = [];
  for (let i = 1; i <= 5; i++) {
    crowns.push(<SVG key={i} xml={crown} width="24" height="19.2" />);
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: bgColor, borderColor: borderColor },
      ]}
      onPress={() => navigateFindAnimals()}
      disabled>
      <HStack justifyContent="space-between">
        <VStack alignContent="space-between" gap={40}>
          <HStack justifyContent="space-between" width={"100%"}>
            <Text style={styles.h5}>{text}</Text>
            <SVG xml={lockIcon} width="24" height="24" />
          </HStack>
          <VStack gap={8}>
            <Text style={styles.bodyFooter}>Previous Score</Text>
            <HStack gap={4}>{crowns}</HStack>
          </VStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default FutureCard;
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
