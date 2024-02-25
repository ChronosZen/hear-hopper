import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Typography, Spacing } from "../../styles/index"; // Adjust the import path as necessary

const TypographyExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Typography Example</Text>
      <Text style={styles.h1}>Heading 1</Text>
      <Text style={styles.h2}>Heading 2</Text>
      <Text style={styles.h3}>Heading 3</Text>
      <Text style={styles.h4}>Heading 4</Text>
      <Text style={styles.h5}>Heading 5</Text>
      <Text style={styles.h6}>Heading 6</Text>
      <Text style={styles.bxl}>Body XL - Regular</Text>
      <Text style={styles.bl}>Body L - Regular</Text>
      <Text style={styles.bm}>Body M - Regular</Text>
      <Text style={styles.bs}>Body S - Regular</Text>
      <Text style={styles.bxs}>Body XS - Regular</Text>
      <Text style={[styles.bxl, styles.semibold]}>Body XL - Semibold</Text>
      <Text style={[styles.bl, styles.semibold]}>Body L - Semibold</Text>
      <Text style={[styles.bm, styles.semibold]}>Body M - Semibold</Text>
      <Text style={[styles.bs, styles.semibold]}>Body S - Semibold</Text>
      <Text style={[styles.bxs, styles.semibold]}>Body XS - Semibold</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.m,
  },
  title: {
    marginBottom: Spacing.s,
    ...Typography.disyplay.x1, // Make sure this is 'display', if it was a typo in the original config
  },
  h1: {
    ...Typography.heading.h1,
  },
  h2: {
    ...Typography.heading.h2,
  },
  h3: {
    ...Typography.heading.h3,
  },
  h4: {
    ...Typography.heading.h4,
  },
  h5: {
    ...Typography.heading.h5,
  },
  h6: {
    ...Typography.heading.h6,
  },
  bxl: {
    ...Typography.body.bxl,
    ...Typography.bodyFont.regular,
  },
  bl: {
    ...Typography.body.bl,
    ...Typography.bodyFont.regular,
  },
  bm: {
    ...Typography.body.bm,
    ...Typography.bodyFont.regular,
  },
  bs: {
    ...Typography.body.bs,
    ...Typography.bodyFont.regular,
  },
  bxs: {
    ...Typography.body.bxs,
    ...Typography.bodyFont.regular,
  },
  semibold: {
    ...Typography.bodyFont.semibold,
  },
});

export default TypographyExample;
