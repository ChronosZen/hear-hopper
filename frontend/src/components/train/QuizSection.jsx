import { StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../styles";
import { HStack, VStack } from "@gluestack-ui/themed";
import SVG from "../svg/SVG";
import { ear, soundIcon } from "../svg/svgs";
import HeaderText from "../reusable/HeaderText";
import ProgressBar from "./ProgressBar";
import AnimalChoices from "./AnimalChoices";
import ButtonFunc from "../reusable/ButtonFunc";
const QuizSection = () => {
  return (
    <VStack padding={24} gap={24}>
      <HStack justifyContent="start" alignItems="center" gap={8}>
        <SVG xml={ear} width="24" height="24" />
        <HeaderText text="Ear Training" />
      </HStack>
      <ProgressBar />
      <VStack
        alignItems="center"
        justifyContent="center"
        margin={"auto"}
        marginBottom={32}
        gap={8}>
        <View style={{ margin: "auto" }}>
          <SVG
            xml={soundIcon}
            width="32"
            height="32"
            fill={Colors.primary.p2}
          />
        </View>
        <Text style={styles.h1}>Which animal are you hearing?</Text>
      </VStack>
      <AnimalChoices />
      <ButtonFunc text="See Answer" />
    </VStack>
  );
};

export default QuizSection;
const styles = StyleSheet.create({
  h1: {
    ...Typography.heading.h1,
    marginBottom: 8,
    textAlign: "center",
  },
  bxl: {
    ...Typography.body.bxl,
    ...Typography.bodyFont.regular,
    textAlign: "center",
    maxWidth: 300,
  },
});
