import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderText from "../components/reusable/HeaderText";
import ButtonFunc from "../components/reusable/ButtonFunc";
import { Image, SafeAreaView } from "@gluestack-ui/themed";

ProfileScreen = ({ navigation }) => {
  function navigateAddProfile() {
    navigation.navigate("AddProfile", { name: "Jane" });
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderText text="Profile" />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          size="lg"
          borderRadius="$full"
          alt="test"
          source={{
            uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          }}
        />
        <ButtonFunc
          text="Add +"
          handleOnPress={() => {
            navigateAddProfile();
          }}
        />
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
