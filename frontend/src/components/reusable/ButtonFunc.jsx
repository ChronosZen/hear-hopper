import { Button, ButtonText, VStack } from "@gluestack-ui/themed";
import { Colors } from "../../styles";

const ButtonFunc = ({
  handleOnPress,
  text = "Text",
  color = Colors.primary.p1,
}) => {
  return (
    <VStack space="lg" pt="$4">
      <Button
        bgColor={color}
        size="sm"
        onPress={() => {
          handleOnPress();
        }}>
        <ButtonText color="$white">{text}</ButtonText>
      </Button>
    </VStack>
  );
};

export default ButtonFunc;
