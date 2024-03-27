import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoiseChecker from "../components/noiseChecker/NoiseChecker";
import HeaderText from "../components/reusable/HeaderText";
import { SafeAreaView, HStack, Icon, CloseIcon } from "@gluestack-ui/themed";

const TestNoiseCheckScreen = ( route ) => {

    // console.log("route from TestNoiseCheckScreen -> ", route)

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <NoiseChecker route={route}/>
        </SafeAreaView>
    )
}

export default TestNoiseCheckScreen;