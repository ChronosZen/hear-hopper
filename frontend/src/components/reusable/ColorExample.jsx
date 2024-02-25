import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "../../styles/index";
import ColorList from "./ColorList";

const ColorExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Color Palette</Text>

      {/* Primary Colors */}
      <Text style={styles.subHeading}>Primary Colors</Text>
      <ColorList color={Colors.primary.p1} label="p1" type="primary" />
      <ColorList color={Colors.primary.p2} label="p2" type="primary" />
      <ColorList color={Colors.primary.p3} label="p3" type="primary" />
      <ColorList color={Colors.primary.p4} label="p4" type="primary" />
      <ColorList color={Colors.primary.p5} label="p5" type="primary" />
      <ColorList color={Colors.primary.p6} label="p6" type="primary" />

      {/* Secondary Colors */}
      <Text style={styles.subHeading}>Secondary Colors</Text>
      <ColorList color={Colors.secondary.g1} label="g1" type="secondary" />
      <ColorList color={Colors.secondary.g2} label="g2" type="secondary" />
      <ColorList color={Colors.secondary.g3} label="g3" type="secondary" />
      <ColorList color={Colors.secondary.g4} label="g4" type="secondary" />
      <ColorList color={Colors.secondary.g5} label="g5" type="secondary" />
      <ColorList color={Colors.secondary.g6} label="g6" type="secondary" />

      {/* Accent Colors */}
      <Text style={styles.subHeading}>Accent Colors</Text>
      <ColorList color={Colors.accent.y1} label="y1" type="accent" />
      <ColorList color={Colors.accent.y2} label="y2" type="accent" />
      <ColorList color={Colors.accent.y3} label="y3" type="accent" />
      <ColorList color={Colors.accent.b1} label="b1" type="accent" />
      <ColorList color={Colors.accent.b2} label="b2" type="accent" />
      <ColorList color={Colors.accent.b3} label="b3" type="accent" />
      <ColorList color={Colors.accent.p1} label="p1" type="accent" />
      <ColorList color={Colors.accent.p2} label="p2" type="accent" />
      <ColorList color={Colors.accent.p3} label="p3" type="accent" />
      <ColorList color={Colors.accent.o1} label="o1" type="accent" />
      <ColorList color={Colors.accent.o2} label="o2" type="accent" />
      <ColorList color={Colors.accent.o3} label="o3" type="accent" />

      {/* Grayscale */}
      <Text style={styles.subHeading}>Grayscale</Text>
      <ColorList color={Colors.gs.black} label="black" type="gs" />
      <ColorList color={Colors.gs.white} label="white" type="gs" />
      <ColorList color={Colors.gs.gs1} label="gs1" type="gs" />
      <ColorList color={Colors.gs.gs2} label="gs2" type="gs" />
      <ColorList color={Colors.gs.gs3} label="gs3" type="gs" />
      <ColorList color={Colors.gs.gs4} label="gs4" type="gs" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.m,
  },
  heading: {
    marginBottom: Spacing.s,
  },
  subHeading: {
    marginTop: Spacing.m,
    marginBottom: Spacing.xs,
  },
  h1: {
    ...Typography.heading.h1,
  },
});

export default ColorExample;
