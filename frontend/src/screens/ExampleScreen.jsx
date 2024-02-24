import { Text, ScrollView, StyleSheet } from "react-native";
import ColorExample from "../components/reusable/ColorExample";
import { Spacing } from "../styles";
import TypographyExample from "../components/reusable/TypographyExample";
const ExampleScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ColorExample />
      <TypographyExample />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.m,
  },
});
export default ExampleScreen;
