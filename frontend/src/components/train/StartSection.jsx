import { StyleSheet, Text, View } from "react-native";
import SVG from "../svg/SVG";
import { mainMastcot } from "../svg/svgs";
import { VStack } from "@gluestack-ui/themed";
import { Typography } from "../../styles";
import ButtonFunc from "../reusable/ButtonFunc";
import CloseButton from "../reusable/CloseButton";
const StartSection = ({ navigation }) => {
  function navigateQuizSection() {
    navigation.navigate("QuizSection");
  }
  return (
    <VStack
      padding={24}
      justifyContent="center"
      alignItems="center"
      marginBottom="auto"
      marginTop="auto">
      <View style={styles.close}>
        <CloseButton navigation={navigation} section={"TrainSection"} />
      </View>
      <SVG xml={mainMastcot} width="180" height="180" />
      <Text style={styles.h4}>Shhh! Listen carefully!</Text>
      <Text style={styles.bxl}>
        Look for animals in the forest by listening to their sounds!!
      </Text>
      <ButtonFunc text="Proceed" handleOnPress={navigateQuizSection} />
    </VStack>
  );
};

export default StartSection;
const styles = StyleSheet.create({
  h4: {
    ...Typography.heading.h4,
    marginBottom: 8,
    textAlign: "center",
  },
  bxl: {
    ...Typography.body.bxl,
    ...Typography.bodyFont.regular,
    textAlign: "center",
    maxWidth: 300,
  },
  close: {
    position: "absolute",
    top: -110,
    right: 10,
  },
});
