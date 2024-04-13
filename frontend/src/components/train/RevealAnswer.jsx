import { VStack } from "@gluestack-ui/themed";
import { StyleSheet, Text, View } from "react-native";
import SVG from "../svg/SVG";
import { correct, wrong } from "../svg/svgs";
import { Typography } from "../../styles";
const RevealAnswer = ({ text = "Good Job!", type = "correct" }) => {
  return (
    <VStack justifyContent="center" alignItems="center" height={150} mb={90}>
      <SVG
        xml={type === "correct" ? correct : wrong}
        width={100}
        height={100}
      />
      <Text style={styles.h1}>{text}</Text>
    </VStack>
  );
};

export default RevealAnswer;
const styles = StyleSheet.create({
  h1: {
    ...Typography.heading.h1,
    marginTop: 26,
    textAlign: "center",
  },
});
