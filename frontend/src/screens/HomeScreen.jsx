import { StyleSheet, View } from "react-native";
import ButtonFunc from "../components/reusable/ButtonFunc";
import React from "react";
import { Colors } from "../styles";
import TestResultCards from "../components/reusable/TestResultCards";
import { useUser } from "../context/UserContext";
import {
  HStack,
  VStack,
  Heading,
  Text,
  Link,
  Image,
  Box,
  Card,
  Pressable,
  Icon,
  ChevronRightIcon,
  LinkText,
  SafeAreaView,
} from "@gluestack-ui/themed";
import ChildSelection from "../components/user/ChildSelection";

const HomeScreen = ({ navigation, route }) => {
  const { firstName } = useUser();

  const onClick = () => {
    console.log("card is clicked.");
  };

  const homeCards = [
    {
      title: "Parental Control",
    },
    {
      title: "Ear Training",
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <VStack gap={Spacing.s}>
          <HStack justifyContent="space-between" alignItems="center">
            <HeaderText text="Welcome" underlineColor={Colors.primary.p4} ></HeaderText>
            <ChildSelection />
          </HStack>
          <TestResultCards viewSec={1} handleOnPress={handleOnPress} softShadow={1} />
        </VStack>

        <VStack padding={Spacing.l} gap={Spacing.m} backgroundColor={Colors.primary.p6} softShadow={1} borderColor={Colors.primary.p5} borderWidth={1} borderRadius={12} position="relative" overflow="hidden" >
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
                paddingHorizontal={Spacing.xl}
                justifyContent="center"
                alignContent="center"
              >
                <SVG xml={headphone} width="24" height="24" fill={Colors.gs.white} />
                <ButtonText style={styles.buttonText}>
                  Take Test
                </ButtonText>
              </Button>
            </VStack>
          </HStack>
          <VStack position="absolute" left={172} top={160} zIndex={1}>
            <SVG xml={mainMastcot} width="200" height="200" />
          </VStack>
        </VStack>

        <HStack gap={Spacing.m} flex={1}>
          {homeCards.map((homeCard, index) => {
            return (

              <Pressable
                key={index}
                flex={1}
                flexGrow={1}
                onPress={() => {
                  if (index === 0) {
                    navigation.navigate("Train");
                  } else {
                    navigation.navigate("ParentalControl");
                  }
                }}>
                {homeCard.title === "Parental Control"
                  ?
                  <Card
                    key={index}
                    style={styles.featuresCards}
                    borderColor={Colors.secondary.g5}
                    backgroundColor={Colors.secondary.g6}>
                    <VStack justifyContent="space-between" gap={20}>
                      <SVG xml={parentalControlIcon} width="40" height="40" />
                      <Heading color={Colors.gs.black} style={styles.featuresCardsText}>{homeCard.title}</Heading>
                    </VStack>
                  </Card>
                  :
                  <Card
                    key={index}
                    style={styles.featuresCards}
                    borderColor={Colors.accent.b2}
                    backgroundColor={Colors.accent.b3}>
                    <VStack justifyContent="space-between" gap={20}>
                      <SVG xml={earTrainginIcon} width="40" height="40" />
                      <Heading color={Colors.gs.black} style={styles.featuresCardsText}>{homeCard.title}</Heading>
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
    marginBottom: Spacing.m,
    gap: Spacing.xl,
    // backgroundColor: "hotpink"
  },
  testCardHeading: {
    ...Typography.heading.h1,
    color: Colors.gs.black,
    paddingRight: 68
  },
  testCardText: {
    ...Typography.body.bl,
    paddingBottom: Spacing.s,
    paddingRight: 45
  },
  buttonText: {
    ...Typography.body.bl,
    color: Colors.gs.white
  },
  featuresCardsText: {
    ...Typography.body.bl
  },
  featuresCards: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  }
})
