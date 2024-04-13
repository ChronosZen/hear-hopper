import { Button, ButtonText, VStack } from "@gluestack-ui/themed";
import { Colors, Typography } from "../../styles";
import { StyleSheet } from "react-native";

const ButtonFunc = ({
  handleOnPress,
  text = "Text",
  color = Colors.gs.black,
  isDisabled,
  textColor = Colors.gs.white,
  size = "sm",
}) => {
  return (
    <VStack space="lg" pt="$4">
      <Button
        bgColor={color}
        size={size}
        height={48}
        borderRadius={48}
        onPress={() => {
          handleOnPress();
        }}
        isDisabled={isDisabled}>
        <ButtonText style={styles.bl} color={textColor}>
          {text}
        </ButtonText>
      </Button>
    </VStack>
  );
};

export default ButtonFunc;
const styles = StyleSheet.create({
  bl: {
    ...Typography.body.bl,
    ...Typography.bodyFont.semibold,
    textAlign: "center",
  },
});
