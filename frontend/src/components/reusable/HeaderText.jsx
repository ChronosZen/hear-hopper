import React, { useState } from "react";
import { HStack, Heading, View } from "@gluestack-ui/themed";
import { Typography, Spacing, Colors } from "../../styles/index";
import { StyleSheet, Text } from "react-native";
import SVG from "../svg/SVG";

const HeaderText = ({
  text = "Header",
  textAlign = "left",
  xml,
  underlineColor = Colors.accent.b2,
}) => {
  const [underlineWidth, setUnderlineWidth] = useState(0);

  const onTextLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setUnderlineWidth(width);
  };

  return (
    <HStack
      justifyContent="center"
      alignItems="center"
      gap={8}
      marginTop={24}
      marginBottom={16}>
      {xml && <SVG xml={xml} width="40" height="40" />}
      <View>
        <Text lineHeight="$md" style={styles.heading} onLayout={onTextLayout}>
          {text}
        </Text>
        <View
          style={[
            styles.underline,
            { width: underlineWidth },
            { backgroundColor: underlineColor },
          ]}
        />
      </View>
    </HStack>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    marginBottom: Spacing.s,
    ...Typography.heading.h2,
    color: Colors.gs.black,
    zIndex: 1,
  },
  underline: {
    position: "absolute",
    height: 10,
    zIndex: 0,
    bottom: 12,
    borderRadius: 4,
    zIndex: 0,
  },
});
