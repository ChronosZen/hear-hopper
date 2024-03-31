import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import SVG from "../svg/SVG";
import { VStack } from "@gluestack-ui/themed";
import { Typography, Colors } from "../../styles";

const AnimalCard = ({ icon, name, isActive, onPress, answerState }) => {
  const isDisabled =
    !isActive && (answerState === "correct" || answerState === "wrong");
  const flipAnim = useRef(new Animated.Value(0)).current;

  const [flipValue, setFlipValue] = useState(0);

  useEffect(() => {
    let targetValue = flipValue === 0 ? 180 : 0;
    if (answerState !== "waiting") {
      Animated.timing(flipAnim, {
        toValue: targetValue,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setFlipValue(targetValue);
    }
  }, [answerState]);

  const flipInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const textFlipInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "-180deg"],
  });

  const animatedStyles = {
    transform: [{ rotateY: flipInterpolate }],
  };

  const textAnimatedStyles = {
    transform: [{ rotateY: textFlipInterpolate }],
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <Animated.View style={animatedStyles}>
        {answerState !== "waiting" && isActive ? (
          <VStack
            padding={17}
            gap={8}
            alignItems="center"
            borderColor={
              answerState === "correct" ? Colors.secondary.g4 : Colors.accent.p2
            }
            borderWidth={1}
            borderRadius={16}
            backgroundColor={
              answerState === "correct" ? Colors.secondary.g5 : Colors.accent.p3
            }>
            <SVG xml={icon} width={65} height={56} />
            <Animated.View style={textAnimatedStyles}>
              <Text style={styles.h6}>{name}</Text>
            </Animated.View>
          </VStack>
        ) : !isActive &&
          (answerState === "correct" || answerState === "wrong") ? (
          <VStack
            padding={17}
            gap={8}
            alignItems="center"
            borderColor={Colors.gs.gs6}
            borderWidth={1}
            borderRadius={16}
            opacity={0.4}
            backgroundColor="transparent">
            <SVG xml={icon} width={65} height={56} />
            <Animated.View style={textAnimatedStyles}>
              <Text style={styles.h6}>{name}</Text>
            </Animated.View>
          </VStack>
        ) : (
          <VStack
            padding={17}
            gap={8}
            alignItems="center"
            borderColor={isActive ? Colors.primary.p4 : Colors.gs.gs6}
            borderWidth={1}
            borderRadius={16}
            backgroundColor={isActive ? Colors.primary.p5 : "transparent"}>
            <SVG xml={icon} width={65} height={56} />
            <Animated.View style={textAnimatedStyles}>
              <Text style={styles.h6}>{name}</Text>
            </Animated.View>
          </VStack>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimalCard;

const styles = StyleSheet.create({
  h6: {
    ...Typography.heading.h6,
    marginBottom: 8,
    textAlign: "center",
  },
});
