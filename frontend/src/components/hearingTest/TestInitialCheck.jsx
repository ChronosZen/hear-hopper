import { StyleSheet, Text, View } from "react-native";
import ButtonFunc from "../reusable/ButtonFunc";
import { Typography } from '../../styles/index';
import { VStack, HStack } from "@gluestack-ui/themed";
import AnimatedLottieView from 'lottie-react-native'
import CloseButton from "../reusable/CloseButton";

const TestInitialCheck = ({navigation}) => {

    const changeSection = () => {
        navigation.navigate("Noise Check")
    }

    return (
        <VStack flex={1} justifyContent="space-between">
            <HStack m={24} justifyContent="flex-end">
                <CloseButton navigation={navigation} section={"Go back"} />
            </HStack>
            <VStack alignItems="center">
                <AnimatedLottieView source={require('../animation/Headphones.json')} autoPlay style={{width:300, height: 300}} />
            </VStack>
            <Text style={{...Typography.heading.h4, textAlign: 'center', marginHorizontal: 32}}>Please wear a Headphone for Accurate Results</Text>
            <View style={{marginBottom: 32, marginHorizontal: 24}}>
                <ButtonFunc text="Proceed" handleOnPress={changeSection} />
            </View>
        </VStack>
    );
};

export default TestInitialCheck;

const styles = StyleSheet.create({});
