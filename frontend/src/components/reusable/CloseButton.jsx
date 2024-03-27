import { TouchableOpacity } from "react-native";
import SVG from "../svg/SVG";
import { closeIcon } from "../svg/svgs";
import { StyleSheet } from "react-native";

const CloseButton = ({ navigation, section }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate(section);
      }}>
      <SVG xml={closeIcon} width="40" height="40" />
    </TouchableOpacity>
  );
};

export default CloseButton;
const styles = StyleSheet.create({
  container: { marginTop: 8 },
});
