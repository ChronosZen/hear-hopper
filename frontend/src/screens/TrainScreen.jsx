import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TrainSection from "../components/train/TrainSection";
import HeaderText from "../components/reusable/HeaderText";
import { HStack, ScrollView } from "@gluestack-ui/themed";
import SVG from "../components/svg/SVG";
import { earTrainginIcon, infoIcon } from "../components/svg/svgs";
import { SafeAreaView } from "react-native-safe-area-context";

const TrainScreen = ({ navigation }) => {
  function navigateFindAnimals() {
    navigation.navigate("StartSection");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <HStack justifyContent="start" alignItems="center" gap={8}>
          <HeaderText text="In Noise Quiz" xml={earTrainginIcon} />
          <View style={styles.infoWrapper}>
            <SVG xml={infoIcon} width="16" height="16" />
          </View>
        </HStack>
        <TrainSection navigateFindAnimals={navigateFindAnimals} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrainScreen;

const styles = StyleSheet.create({
  infoWrapper: {
    marginTop: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 24,
  },
});
