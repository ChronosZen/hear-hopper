import { Heading } from "@gluestack-ui/themed";
import { Typography, Spacing, Colors } from "../../styles/index";
import { StyleSheet } from "react-native";
const HeaderText = ({ text = "Header", textAlign = "left", underline = false, customStyle }) => {
  return (
    <Heading style={styles.heading} textAlign={textAlign} lineHeight="$md" 
    // underline={underline} 
    customStyle={customStyle} >
      {text}
    </Heading>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    marginBottom: Spacing.s,
    ...Typography.heading.h2,
    color: Colors.gs.black,
  }
});
