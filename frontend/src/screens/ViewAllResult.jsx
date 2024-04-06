import { StyleSheet, Text, View } from "react-native";
import TestResultCards from "../components/reusable/TestResultCards";
import { VStack, HStack } from "@gluestack-ui/themed";
import ChildSelection from "../components/user/ChildSelection";
import SVG from "../components/svg/SVG";
import { ear } from "../components/svg/svgs";
import { Typography, Colors } from "../styles/index";
import HeaderText from "../components/reusable/HeaderText";

const ViewAllResult = ({navigation}) => {

  return (
    <VStack flex={1} mt={12}>
        <HStack justifyContent="space-between" alignItems="center" m={24} >
            <HeaderText text="Results" underlineColor={Colors.primary.p5} />
            <ChildSelection />
        </HStack>
        <TestResultCards viewSec={2} />
    </VStack>
  );
};

export default ViewAllResult;

const styles = StyleSheet.create({});
