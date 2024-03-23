import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoiseChecker from "../components/noiseChecker/NoiseChecker";
import { SafeAreaView, HStack, Icon, CloseIcon } from "@gluestack-ui/themed";

const ParentalControlNoiseCheckScreen = ( ) => {
    // console.log("route from ParentalControlNoiseCheckScreen -> ", route)

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <NoiseChecker />
        </SafeAreaView>
    )
}

export default ParentalControlNoiseCheckScreen;