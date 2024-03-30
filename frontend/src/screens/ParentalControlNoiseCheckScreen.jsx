import { StyleSheet, View } from "react-native";
import React from "react";
import NoiseChecker from "../components/noiseChecker/NoiseChecker";
import { SafeAreaView } from "@gluestack-ui/themed";
import { Spacing } from "../styles";


const ParentalControlNoiseCheckScreen = () => {
    // console.log("route from ParentalControlNoiseCheckScreen -> ", route)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <NoiseChecker text="We will check Environmental Noise Level." />
            </View>
        </SafeAreaView>
    )
}

export default ParentalControlNoiseCheckScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Spacing.l,
      paddingTop: Spacing.l,
      paddingBottom: Spacing.m
    }
  }
)