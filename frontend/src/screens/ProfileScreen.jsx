import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderText from "../components/reusable/HeaderText";
import ButtonFunc from "../components/reusable/ButtonFunc";
import { Image, VStack } from "@gluestack-ui/themed";
import Dad from "../../assets/dad.jpg";
import KidDisplay from "../components/user/KidDisplay";
import { useQuery } from "@tanstack/react-query";
import * as secureStorage from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, SafeAreaView, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import Dad from "../../assets/dad.jpg";
import KidDisplay from "../components/user/KidDisplay";
import { useQuery } from "@tanstack/react-query";
import * as secureStorage from 'expo-secure-store';
import SVG from "../components/svg/SVG";
import { ear } from "../components/svg/svgs";
import { Typography } from "../styles/index";

ProfileScreen = ({ navigation, route }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["myData"],
    queryFn: async () =>
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${await secureStorage.getItemAsync(
            "JwtToken"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((json) => json.data),
  });

  if (isPending) return <Text>Loading...</Text>;

  if (error) return <Text>An error has occurred: ${error.message}</Text>;

  const userData = data;

  const kidArr = [...userData.kids].sort(
    (kid1, kid2) => new Date(kid2.createdAt) - new Date(kid1.createdAt)
  );
  function navigateAddProfile() {
    navigation.navigate("AddProfile", { name: "Jane" });
  }
  function navigateSample() {
    navigation.navigate("Example");
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView >
        <VStack justifyContent="center" alignItems="center" gap={8}>
          <HeaderText text="Profile" />
          <Text>Hello, {userData.firstName}</Text>
          <Image size="lg" borderRadius="$full" alt="test" source={Dad} />
        </VStack>

        <VStack justifyContent="center" alignItems="start" gap={8}>
          {kidArr.map((kid) => (
            <KidDisplay
              image={kid.image}
              childName={kid.firstName}
              key={kid.id}
            />
          ))}
        </VStack>

        <VStack alignItems="center" marginBottom={12}>
          <ButtonFunc
            text="Add +"
            handleOnPress={() => {
              navigateAddProfile();
            }}
          />
        </VStack>
        {/* <View style={{ flex: 1, alignItems: "center", gap: 32 }}>
          
          <View style={{ flex: 1 }}> */}
            {/* <ButtonFunc
              text="View Sample"
              handleOnPress={() => {
                navigateSample();
              }}
            /> */}
          {/* </View>
        </View> */}

        <VStack gap={22}>
            <HStack alignItems="center">
              <SVG xml={ear} width="24" height="24" />
              <Text style={Typography.body.bl}>Change Password</Text>
            </HStack>
            <HStack alignItems="center">
              <SVG xml={ear} width="24" height="24" />
              <Text style={Typography.body.bl}>Privacy Policy</Text>
            </HStack>
            <HStack alignItems="center">
              <SVG xml={ear} width="24" height="24" />
              <Text style={Typography.body.bl}>Terms of Use</Text>
            </HStack>
            <HStack alignItems="center">
              <SVG xml={ear} width="24" height="24" />
              <Text style={Typography.body.bl}>Help</Text>
            </HStack>
            <HStack alignItems="center">
              <SVG xml={ear} width="24" height="24" />
              <Text style={Typography.body.bl}>Logout</Text>
            </HStack>
          </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    marginTop: 10,
  },
});
