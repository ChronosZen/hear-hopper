import HeaderText from "../components/reusable/HeaderText";
import { StyleSheet, View } from "react-native";
import {
  HStack,
  VStack,
  Heading,
  Text,
  Box,
  Divider,
  Pressable,
} from "@gluestack-ui/themed";
import SVG from "../components/svg/SVG";
import {
  parentalControlIcon,
  circleChevronRight,
} from "../components/svg/svgs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography, Spacing, Colors } from "../styles";

const ParentalControlScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HStack alignItems="center" space="sm" marginBottom={Spacing.m}>
          <SVG xml={parentalControlIcon} width="40" height="40" />
          <HeaderText
            text="Parental Control"
            underlineColor={Colors.secondary.g5}
          />
        </HStack>

        <VStack>
          <Box>
            <Pressable
              onPress={() => {
                navigation.navigate("Parental Control Noise Check");
              }}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <VStack space="sm">
                  <Heading style={styles.heading}>Noise Check</Heading>
                  <Text style={styles.text}>
                    Run an Environmental Noise Check.
                  </Text>
                </VStack>
                <SVG xml={circleChevronRight} width="40" height="40" />
              </HStack>
            </Pressable>
          </Box>
          <Divider
            bg="$trueGray300"
            $dark-bg="$backgroundDark700"
            marginVertical={Spacing.l}
          />
          <Box>
            <Pressable
              onPress={() => {
                navigation.navigate("Parental Control Volume Setting");
              }}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <VStack space="sm">
                  <Heading style={styles.heading}>Volume Setting</Heading>
                  <Text style={styles.text}>
                    Set the volume level for the app.
                  </Text>
                </VStack>
                <SVG xml={circleChevronRight} width="40" height="40" />
              </HStack>
            </Pressable>
          </Box>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.l,
  },
  heading: {
    ...Typography.heading.h4,
    color: Colors.gs.black,
  },
  text: {
    ...Typography.body.bl,
    color: Colors.gs.black,
  },
});

export default ParentalControlScreen;
