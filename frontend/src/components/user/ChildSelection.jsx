import { Pressable, Text, View } from "react-native";
import { useUser } from "../../context/UserContext";
import { HStack, Image } from "@gluestack-ui/themed";
import { useState } from "react";
import SVG from "../svg/SVG";
import { refreshIcon } from "../svg/svgs";
import ChildModal from "./ChildModal";

const ChildSelection = () => {
  const { selectedKidImage, kids } = useUser();
  const [isModelOpen, setIsModelOpen] = useState(false);
  return (
    <>
      {isModelOpen && (
        <ChildModal
          setIsModelOpen={setIsModelOpen}
          isModelOpen={isModelOpen}
          kids={kids}
        />
      )}
      <HStack alignItems="center" space="md">
        <Pressable
          onPress={() => {
            setIsModelOpen(!isModelOpen);
          }}>
          <SVG xml={refreshIcon} width="18" height="18" />
        </Pressable>

        {selectedKidImage && (
          <Image
            size="md"
            borderRadius="$none"
            alt="mascot"
            source={selectedKidImage}
          />
        )}
      </HStack>
    </>
  );
};

export default ChildSelection;
