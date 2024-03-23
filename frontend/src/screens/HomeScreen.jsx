import { StyleSheet, View } from "react-native";
import HeaderText from "../components/reusable/HeaderText";
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
    <VStack flex={1} padding={16}>
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center">
        <HeaderText customStyle={homeStyles.heading} text="Welcome"  ></HeaderText>
        <ChildSelection />
      </HStack>

      <HStack>
        <VStack></VStack>

      </HStack>


    </VStack>


    // <SafeAreaView
    //   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   {/* Header */}
    //   <Box minWidth={"$full"} backgroundColor={Colors.primary.p1}>
    //     <HStack
    //       justifyContent="space-between"
    //       alignItems="center"
    //       paddingHorizontal={16}>
    //       <VStack>
    //         <Heading color="white">Welcome</Heading>
    //         <Heading color="white">{firstName}</Heading>
    //       </VStack>
    //       
    //     </HStack>
    //   </Box>

    //   {/*Latest Test result section*/}
    //   <TestResultCards />

    //   {/* Hearing test section */}
    //   <HStack margin={16} space="xl">
    //     <VStack margin={16}>
    //       <Heading>Test your child hearing</Heading>
    //       <Text>
    //         Our hearing test is created keeping your child\'s ear sensitivity in
    //         mind.
    //       </Text>
    //       <ButtonFunc
    //         text={"Take the test"}
    //         handleOnPress={() => navigation.navigate("Test")}></ButtonFunc>
    //     </VStack>

    //     {/* <Image size="md"
    //         borderRadius="$none"
    //         source={{
    //           uri: "https://picsum.photos/seed/picsum/200/300",
    //         }}
    //          /> */}
    //   </HStack>

    //   {/* Cards (Ear training & Parental control) section */}
    //   {/* <Image></Image> */}

    //   {homeCards.map((homeCard, index) => {
    //     return (
    //       <View key={index}>
    //         <Pressable
    //           onPress={() => {
    //             if (index === 0) {
    //               navigation.navigate("Train");
    //             } else {
    //               navigation.navigate("ParentalControl");
    //             }
    //           }}>
    //           <Card
    //             key={index}
    //             margin={16}
    //             borderWidth={1}
    //             borderColor={Colors.primary.p1}
    //             backgroundColor={Colors.primary.p5}>
    //             <HStack justifyContent="space-between">
    //               <Heading color={Colors.primary.p1}>{homeCard.title}</Heading>
    //               <Icon
    //                 as={ChevronRightIcon}
    //                 m="$2"
    //                 w="$4"
    //                 h="$4"
    //                 color={Colors.primary.p1}
    //               />
    //             </HStack>
    //           </Card>
    //         </Pressable>
    //       </View>
    //     );
    //   })}
    // </SafeAreaView>
  );
};

export default HomeScreen;

const homeStyles = StyleSheet.create({
  heading: {
    textDecorationLine: "underline",
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.primary.p1,
    textDecorationThickness: 4,
    backgroundColor: Colors.primary.p5,
  }
});

