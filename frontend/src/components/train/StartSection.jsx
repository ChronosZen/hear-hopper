import { StyleSheet, Text, View } from "react-native";
import SVG from "../svg/SVG";
import { mainMastcot } from "../svg/svgs";
import { HStack, VStack } from "@gluestack-ui/themed";
import { Typography } from "../../styles";
import ButtonFunc from "../reusable/ButtonFunc";
import CloseButton from "../reusable/CloseButton";
import AnimatedLottieView from "lottie-react-native";
const StartSection = ({ navigation }) => {
  function navigateQuizSection() {
    navigation.navigate("QuizSection");
  }
  return (
    <>
      <VStack padding={24}>
        <HStack mt={24} justifyContent="flex-end">
          <CloseButton navigation={navigation} section={"TrainSection"} />
        </HStack>
        <VStack alignItems="center" mt={86}>
          <AnimatedLottieView
            source={require("../animation/Headphones.json")}
            autoPlay
            style={{ width: 225, height: 225 }}
          />
        </VStack>
        <VStack mt={72} alignItems="center">
          <Text style={styles.h2}>Shhh! Listen carefully!</Text>
          <Text style={styles.bxl}>
            Look for animals in the forest by listening to their sounds!
          </Text>
        </VStack>
      </VStack>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginHorizontal: 24,
          marginBottom: 48,
        }}>
        <ButtonFunc text="Start Training" handleOnPress={navigateQuizSection} />
      </View>
    </>
  );
};

export default StartSection;
const styles = StyleSheet.create({
  h2: {
    ...Typography.heading.h2,
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
