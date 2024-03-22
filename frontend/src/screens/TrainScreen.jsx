import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TrainSection from "../components/train/TrainSection";
import HeaderText from "../components/reusable/HeaderText";
import { HStack } from "@gluestack-ui/themed";
import SVG from "../components/svg/SVG";
import { infoIcon } from "../components/svg/svgs";
import { SafeAreaView } from "react-native-safe-area-context";

const TrainScreen = ({ navigation }) => {
  function navigateFindAnimals() {
    navigation.navigate("StartSection");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "start",
          alignItems: "start",
          padding: 24,
        }}>
        <HStack justifyContent="start" alignItems="center" gap={8}>
          <HeaderText text="Ear Training" />
          <SVG xml={infoIcon} width="24" height="24" />
        </HStack>
        <TrainSection navigateFindAnimals={navigateFindAnimals} />
      </View>
    </SafeAreaView>
  );
};

export default TrainScreen;

const styles = StyleSheet.create({});
