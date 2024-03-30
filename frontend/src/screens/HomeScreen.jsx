import { StyleSheet, View } from "react-native";
import HeaderText from "../components/reusable/HeaderText";
import React from "react";
import SVG from "../components/svg/SVG";
import {
  mainMastcot,
  parentalControlIcon,
  earTrainginIcon,
  headphone
} from "../components/svg/svgs";
import TestResultCards from "../components/reusable/TestResultCards";
import {
  HStack,
  VStack,
  Heading,
  Text,
  Card,
  Pressable,
  Button,
  ButtonText
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import ChildSelection from "../components/user/ChildSelection";
import { Typography, Spacing, Colors } from "../styles";

const HomeScreen = ({ navigation, route }) => {

  const homeCards = [
    {
      title: "Child Ear Training",
    },
    {
      title: "Parental Control",
    },
  ];

  const handleOnPress = () => {
    // console.log("checking the handleOnPress function.");
    navigation.navigate("Test", { screen: 'All Results' });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <HStack justifyContent="space-between" alignItems="center" >
          <HeaderText text="Welcome" underlineColor={Colors.primary.p4} ></HeaderText>
          <ChildSelection />
        </HStack>

        <TestResultCards viewSec={1} handleOnPress={handleOnPress} softShadow={2} />

        <VStack borderRadius={16} backgroundColor={Colors.primary.p5} softShadow={2} gap={24} borderColor={Colors.primary.p3} borderWidth={1} position="relative" padding={Spacing.l} overflow="hidden" >
          <Heading style={styles.testCardHeading}>Test your child's hearing</Heading>
          <Text style={styles.testCardText}>Our hearing test is created keeping your child's ear sensitivity in mind.</Text>
          <HStack alignItems="center">
            <VStack flexBasis={"60%"}  >
              <Button
                bgColor={Colors.gs.black}
                size={"xl"}
                height={48}
                borderRadius={48}
                gap={Spacing.s}
                onPress={() => navigation.navigate("Test")}
                paddingHorizontal={Spacing.l}
                justifyContent="center"
                alignContent="center"
              >
                <SVG xml={headphone} width="24" height="24" fill={Colors.gs.white} />
                <ButtonText style={styles.bl} color={Colors.gs.white}>
                  Take Test
                </ButtonText>
              </Button>
              <></>
            </VStack>
          </HStack>
          <VStack position="absolute" left={256} top={144} zIndex={1}>
            <SVG xml={mainMastcot} width="200" height="200" />
          </VStack>
        </VStack>

        <HStack gap={Spacing.l}>
          {homeCards.map((homeCard, index) => {
            return (

                <Pressable
                  key={index}
                  flexGrow={1}
                  onPress={() => {
                    if (index === 0) {
                      navigation.navigate("Train");
                    } else {
                      navigation.navigate("ParentalControl");
                    }
                  }}>
                  {homeCard.title === "Child Ear Training"
                    ?
                    <Card
                      key={index}
                      borderWidth={1}
                      shadowColor={true}
                      borderColor={Colors.secondary.g3}
                      backgroundColor={Colors.secondary.g6}>
                      <VStack justifyContent="space-between" gap={Spacing.l}>
                        <SVG xml={parentalControlIcon} width="40" height="40" />
                        <Heading color={Colors.gs.black}>{homeCard.title}</Heading>
                      </VStack>
                    </Card>
                    :
                    <Card
                      key={index}
                      borderWidth={1}
                      shadowColor={true}
                      borderColor={Colors.accent.b2}
                      backgroundColor={Colors.accent.b3}>
                      <VStack justifyContent="space-between" gap={24}>
                        <SVG xml={earTrainginIcon} width="40" height="40" />
                        <Heading color={Colors.gs.black}>{homeCard.title}</Heading>
                      </VStack>
                    </Card>
                  }
                </Pressable>
            );
          })}
        </HStack >
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.l,
    paddingVertical: Spacing.xl,
    gap: Spacing.xl,
  },
  testCardHeading: {
    ...Typography.heading.h1,
    color: Colors.gs.black,
    paddingBottom: 0,
    paddingRight: 68
  },
  testCardText: {
    ...Typography.body.bl,
    paddingVertical: 0,
    paddingRight: 45
  }
}
)