import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoiseChecker from "../components/user/NoiseChecker";
import TrainSection from "../components/train/TrainSection";
import HeaderText from "../components/reusable/HeaderText";
import { HStack } from "@gluestack-ui/themed";
import SVG from "../components/svg/SVG";
import { infoIcon } from "../components/svg/svgs";

const TrainScreen = ({ navigation }) => {
  function navigateFindAnimals() {
    navigation.navigate("StartSection");
  }

  return (
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
      <NoiseChecker />
    </View>
  );
};

export default TrainScreen;

const styles = StyleSheet.create({});
