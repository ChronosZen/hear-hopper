import { TouchableOpacity } from "react-native";
import SVG from "../svg/SVG";
import { closeIcon } from "../svg/svgs";

const CloseButton = ({ navigation, section }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(section);
      }}>
      <SVG xml={closeIcon} width="40" height="40" />
    </TouchableOpacity>
  );
};

export default CloseButton;
