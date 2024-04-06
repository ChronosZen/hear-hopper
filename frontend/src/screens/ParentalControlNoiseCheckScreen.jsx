import { StyleSheet, View, Text } from "react-native";
import React from "react";
import NoiseChecker from "../components/noiseChecker/NoiseChecker";
import { SafeAreaView } from "react-native-safe-area-context";
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
      paddingBottom: 40,
    }
  }
)