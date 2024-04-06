import { StyleSheet, View } from "react-native";
import React from "react";
import NoiseChecker from "../components/noiseChecker/NoiseChecker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacing } from "../styles";

const TestNoiseCheckScreen = (route) => {

    // console.log("route from TestNoiseCheckScreen -> ", route)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <NoiseChecker route={route} text="We will conduct an Environmental Noise Check before starting the test." />
            </View>
        </SafeAreaView>
    )
}

export default TestNoiseCheckScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Spacing.l,
      paddingBottom: 40
    }
  }
)