import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SVG from "../svg/SVG";
import { VStack } from "@gluestack-ui/themed";
import { Typography, Colors } from "../../styles";

const AnimalCard = ({ icon, name, isActive, onPress, answerState }) => {
  const isDisabled = answerState === "correct" && !isActive;

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      {answerState !== "waiting" && isActive ? (
        <VStack
          padding={17}
          gap={8}
          alignItems="center"
          borderColor={
            answerState === "correct" ? Colors.secondary.g4 : Colors.accent.p2
          }
          borderWidth={1}
          borderRadius={16}
          backgroundColor={
            answerState === "correct" ? Colors.secondary.g5 : Colors.accent.p3
          }>
          <SVG xml={icon} width={65} height={56} />
          <Text style={styles.h6}>{name}</Text>
        </VStack>
      ) : answerState === "correct" && !isActive ? (
        <VStack
          padding={17}
          gap={8}
          alignItems="center"
          borderColor={Colors.gs.gs6}
          borderWidth={1}
          borderRadius={16}
          opacity={0.4}
          backgroundColor="transparent">
          <SVG xml={icon} width={65} height={56} />
          <Text style={styles.h6}>{name}</Text>
        </VStack>
      ) : (
        <VStack
          padding={17}
          gap={8}
          alignItems="center"
          borderColor={isActive ? Colors.primary.p4 : Colors.gs.gs6}
          borderWidth={1}
          borderRadius={16}
          backgroundColor={isActive ? Colors.primary.p5 : "transparent"}>
          <SVG xml={icon} width={65} height={56} />
          <Text style={styles.h6}>{name}</Text>
        </VStack>
      )}
    </TouchableOpacity>
  );
};

export default AnimalCard;

const styles = StyleSheet.create({
  h6: {
    ...Typography.heading.h6,
    marginBottom: 8,
    textAlign: "center",
  },
});
