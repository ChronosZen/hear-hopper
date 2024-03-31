import { HStack, Image } from "@gluestack-ui/themed";
import { Text, View } from "react-native";
import placeHolder from "../../../assets/PlaceholderAvatar.jpg"

const KidDisplay = ({ image, childName }) => {
  return (
    <HStack gap={16} maxHeight={250} justifyContent="start" alignItems="center">
      <Image size="sm" borderRadius="$full" source={image?image:placeHolder} alt={childName} />
      <Text>{childName}</Text>
    </HStack>
  );
};

export default KidDisplay;
