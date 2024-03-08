import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderText from "../components/reusable/HeaderText";
import ButtonFunc from "../components/reusable/ButtonFunc";
import { Image, SafeAreaView, VStack } from "@gluestack-ui/themed";
import Dad from "../../assets/dad.jpg";
import KidDisplay from "../components/user/KidDisplay";

ProfileScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  const kidArr = userData.kidInfo;
  function navigateAddProfile() {
    navigation.navigate("AddProfile", { name: "Jane" });
  }
  function navigateSample() {
    navigation.navigate("Example");
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <VStack justifyContent="center" alignItems="center" gap={8}>
        <HeaderText text="Profile" />
        <Text>Hello, {userData.firstName}</Text>
        <Image size="lg" borderRadius="$full" alt="test" source={Dad} />
      </VStack>
      <VStack justifyContent="center" alignItems="start" gap={8}>
        {kidArr.map((kid) => (
          <KidDisplay image={kid.image} childName={kid.childName} />
        ))}
      </VStack>
      <View style={{ flex: 1, alignItems: "center", gap: 32 }}>
        <ButtonFunc
          text="Add +"
          handleOnPress={() => {
            navigateAddProfile();
          }}
        />
        <View style={{ flex: 1 }}>
          <ButtonFunc
            text="View Sample"
            handleOnPress={() => {
              navigateSample();
            }}
          />
        </View>
      </View>
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
