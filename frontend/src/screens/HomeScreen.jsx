import { StyleSheet, View } from "react-native";
import HeaderText from "../components/reusable/HeaderText";
import ButtonFunc from "../components/reusable/ButtonFunc";
import React from "react";
import { Colors } from "../styles";
import SVG from "../components/svg/SVG";
import { mainMastcot,
  parentalControlIcon, 
  earTrainginIcon  } from "../components/svg/svgs";
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
import { Header } from "react-native/Libraries/NewAppScreen";

const HomeScreen = ({ navigation, route }) => {
  const { firstName } = useUser();

  const onClick = () => {
    console.log("card is clicked.");
  };

  const homeCards = [
    {
      title: "Child Ear Training",
    },
    {
      title: "Parental Control",
    },
  ];

  return (
    <VStack flex={1} p="$4">
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center">
        <HeaderText text="Welcome"  ></HeaderText>
        <ChildSelection />
      </HStack>

      <TestResultCards />

      <VStack borderRadius={16} backgroundColor={Colors.primary.p5} softShadow={2}>
        <Heading size="xl" py="$2" px="$8">Test your kid's hearing</Heading>
        <Text px="$8" py="$2" fontSize={"$lg"}>Our hearing test is created keeping your kid's ear sensitivity in mind.</Text>
        <HStack px="$8" py="$4" justifyContent="space-between" alignItems="center">
          <ButtonFunc
            text={"Take the test"}
            handleOnPress={() => navigation.navigate("Test")}>
          </ButtonFunc>
          <SVG xml={mainMastcot} width="120" height="120" />
        </HStack>
      </VStack>

      <HStack gap={2} >
        {homeCards.map((homeCard, index) => {
          return (
            <VStack key={index} flexBasis="20%" flexGrow={1}>
              <Pressable
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
                    margin={16}
                    borderWidth={1}
                    shadowColor={true}
                    borderColor={Colors.secondary.g5}
                    backgroundColor={Colors.secondary.g6}>
                    <VStack justifyContent="space-between" gap={24}>
                      <SVG xml={parentalControlIcon} width="40" height="40" />
                      <Heading color="black">{homeCard.title}</Heading>
                    </VStack>
                  </Card>
                  :
                  <Card
                    key={index}
                    margin={16}
                    borderWidth={1}
                    shadowColor={true}
                    borderColor={Colors.accent.b2}
                    backgroundColor={Colors.accent.b3}>
                    <VStack justifyContent="space-between" gap={24}>
                      <SVG xml={earTrainginIcon} width="40" height="40" />
                      <Heading color="black">{homeCard.title}</Heading>
                    </VStack>
                  </Card>
                }
              </Pressable>
            </VStack>
          );
        })}
      </HStack >
    </VStack >
  );
};

export default HomeScreen;