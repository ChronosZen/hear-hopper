import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderText from "../components/reusable/HeaderText";
import ButtonFunc from "../components/reusable/ButtonFunc";
import { Image, SafeAreaView } from "@gluestack-ui/themed";

ProfileScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  console.log(userData);
  function navigateAddProfile() {
    navigation.navigate("AddProfile", { name: "Jane" });
  }
  function navigateSample() {
    navigation.navigate("Example");
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderText text="Profile" />
      <Text>Hello, {userData.firstName}</Text>
      <View style={{ flex: 1, alignItems: "center", gap: 32 }}>
        <Image
          size="lg"
          borderRadius="$full"
          alt="test"
          source={{ uri: userData.kidInfo.image }}
        />
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
    marginTop: 70,
  },
});
