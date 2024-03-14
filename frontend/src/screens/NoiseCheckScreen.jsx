import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoiseChecker from "../components/user/NoiseChecker";
import HeaderText from "../components/reusable/HeaderText";
import { SafeAreaView, HStack, Icon, CloseIcon } from "@gluestack-ui/themed";

const NoiseCheckScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <HStack space="xl">
                <HeaderText text="Noise Check" />
                <Icon as={CloseIcon} m="$2" w="$4" h="$4" />
            </HStack>
            <Text>We will conduct an Environmental Noise Check before starting the test.</Text>
            <NoiseChecker />
        </SafeAreaView>
    )
}

export default NoiseCheckScreen;