import { StyleSheet, View } from "react-native";
import ButtonFunc from "../components/reusable/ButtonFunc";
import React from "react";
import { Colors } from "../styles";
import TestResultCards from "../components/reusable/TestResultCards";
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
  SafeAreaView
} from '@gluestack-ui/themed';

const HomeScreen = ({ navigation, route }) => {
   const { userData } = route.params;
  // console.log("route.params from home screen -> ", route.params);

  const onClick = () => {
    console.log("card is clicked.")
  }

  const homeCards = [{
    title: "Child Ear Training"
  },
  {
    title: "Parental Control"
  }]

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Header */}
      <Box minWidth={"$full"} backgroundColor={Colors.primary.p1}>
        <HStack justifyContent="space-between" alignItems="center" paddingHorizontal={16}>
          <VStack >
            <Heading color="white">Welcome</Heading>
            <Heading color="white">{userData.firstName}</Heading>
          </VStack>
          <Image
            size="md"
            borderRadius="$none"
            alt="mascot"
            source={{
              uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            }} />
        </HStack>
      </Box>

      {/*Latest Test result section*/}
      <TestResultCards />

      {/* Hearing test section */}
      <HStack margin={16} space="xl">
        <VStack margin={16}>
          <Heading>Test your child hearing</Heading>
          <Text>Our hearing test is created keeping your child\'s ear sensitivity in mind.</Text>
          <ButtonFunc text={"Take the test"} handleOnPress={() => navigation.navigate("Test")} >
          </ButtonFunc>
        </VStack>

        {/* <Image size="md"
            borderRadius="$none"
            source={{
              uri: "https://picsum.photos/seed/picsum/200/300",
            }}
             /> */}
      </HStack>

      {/* Cards (Ear training & Parental control) section */}
      {/* <Image></Image> */}

      {homeCards.map((homeCard, index) => {
        return (
          <View key={index}>
            <Pressable onPress={() => {
              if (index === 0) {
                navigation.navigate("Train")
              } else {
                navigation.navigate("ParentalControl")
              }
            }}>
              <Card key={index} margin={16} borderWidth={1} borderColor={Colors.primary.p1} backgroundColor={Colors.primary.p5}  >
                <HStack justifyContent="space-between" >
                  <Heading color={Colors.primary.p1}>{homeCard.title}</Heading>
                  <Icon as={ChevronRightIcon} m="$2" w="$4" h="$4" color={Colors.primary.p1} />
                </HStack>
              </Card>
            </Pressable>
          </View>
        )
      })}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});