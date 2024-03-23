import { StyleSheet, Text, View } from "react-native";
import TestResultCards from "../components/reusable/TestResultCards";
import { VStack, HStack } from "@gluestack-ui/themed";
import ChildSelection from "../components/user/ChildSelection";
import SVG from "../components/svg/SVG";
import { ear } from "../components/svg/svgs";
import { Typography, Colors } from "../styles/index";

const ViewAllResult = ({navigation}) => {

  return (
    <VStack marginHorizontal={24}>
        <HStack justifyContent="space-between" alignItems="center" >
            <HStack alignItems="center" gap={6}>
                <View style={{backgroundColor:Colors.primary.p5, width:40, height:40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <SVG xml={ear} width="24" height="24" />
                </View>
                <Text style={Typography.heading.h2}>Results</Text>
            </HStack>
            <ChildSelection />
        </HStack>
        <TestResultCards viewSec={2} />
    </VStack>
  );
};

export default ViewAllResult;

const styles = StyleSheet.create({});
