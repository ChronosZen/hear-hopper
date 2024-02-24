import { View, Text, StyleSheet } from "react-native";
import { Typography, Spacing } from "../../styles/index"; // Adjust the import path as necessary
const ColorList = ({ color, label, type }) => (
  <View style={styles.swatchContainer}>
    <View style={[styles.colorPreview, { backgroundColor: color }]} />
    <Text style={styles.colorLabel}>
      {color} {`backgroundColor: Colors.${type}.${label}`}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  swatchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: Spacing.s,
  },
  colorLabel: {
    ...Typography.body.xs,
  },
});

export default ColorList;
