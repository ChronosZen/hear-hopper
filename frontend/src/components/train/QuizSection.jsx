import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../styles";
import { Audio } from "expo-av";
import {
  ButtonText,
  CloseIcon,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from "@gluestack-ui/themed";
import SVG from "../svg/SVG";
import axios from "axios";
import { ear, happyMascot, soundIcon, earTrainginIcon } from "../svg/svgs";
import HeaderText from "../reusable/HeaderText";
import ProgressBar from "./ProgressBar";
import AnimalChoices from "./AnimalChoices";
import ButtonFunc from "../reusable/ButtonFunc";
import { useReducer } from "react";
import RevealAnswer from "./RevealAnswer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import * as secureStorage from "expo-secure-store";
import CloseButton from "../reusable/CloseButton";

const quizData = [
  {
    correctAnswer: "Cat",
    options: ["Cat", "Cow", "Goat"],
    sound: {
      name: "cat",
      file: require("../../../assets/audioFiles/training/cat_sound.wav"),
      volume: 1,
    },
  },
  {
    correctAnswer: "Cow",
    options: ["Tiger", "Cow", "Dog"],
    sound: {
      name: "cow",
      file: require("../../../assets/audioFiles/training/cow_sound.wav"),
      volume: 1,
    },
  },
  {
    correctAnswer: "Goat",
    options: ["Goat", "Cat", "Cow"],
    sound: {
      name: "goat",
      file: require("../../../assets/audioFiles/training/goat_sound.wav"),
      volume: 1,
    },
  },
  {
    correctAnswer: "Tiger",
    options: ["Dog", "Tiger", "Cat"],
    sound: {
      name: "tiger",
      file: require("../../../assets/audioFiles/training/tiger_sound.wav"),
      volume: 1,
    },
  },
  {
    correctAnswer: "Dog",
    options: ["Cow", "Dog", "Goat"],
    sound: {
      name: "dog",
      file: require("../../../assets/audioFiles/training/dog_sound.wav"),
      volume: 1,
    },
  },
];

const initialState = {
  question: 0,
  pageState: "question",
  answerState: "waiting",
  userAnswer: "",
  score: 0,
  showModal: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "question":
      return {
        ...state,
        pageState: action.payload,
      };
    case "selectAnswer":
      return {
        ...state,
        userAnswer: action.payload,
      };
    case "checkAnswer":
      return {
        ...state,
        pageState: action.payload.pageState,
        answerState: action.payload.answerState,
        score: state.score + action.payload.score,
      };
    case "next":
      return {
        ...state,
        question: state.question + 1,
        pageState: "question",
        answerState: "waiting",
        userAnswer: "",
      };
    case "finish":
      return {
        ...state,
        pageState: "finish",
      };
    case "showModal":
      return {
        ...state,
        showModal: true,
      };
    case "exit":
      return {
        ...state,
        showModal: false,
        question: 0,
        pageState: "question",
        answerState: "waiting",
      };
  }
}
async function playCompletedSound() {
  const yaySound = require("../../../assets/audioFiles/training/yay-6120.mp3");
  try {
    const { sound } = await Audio.Sound.createAsync(yaySound);
    const completedSound = sound;
    await completedSound.playAsync();
  } catch (error) {
    console.error("Error playing feedback sound:", error);
  }
}
const QuizSection = ({ navigation }) => {
  const [
    { question, pageState, answerState, userAnswer, showModal, score },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { selectedKidId, dispatch: dispatchContext } = useUser();

  const checkAnswer = (userAnswer, correctAnswer, question) => {
    if (userAnswer === correctAnswer) {
      dispatch({
        type: "checkAnswer",
        payload: {
          pageState: "revealAnswer",
          answerState: "correct",
          score: 1,
        },
      });
    } else {
      dispatch({
        type: "checkAnswer",
        payload: {
          pageState: "revealAnswer",
          answerState: "wrong",
          score: 0,
        },
      });
      if (question > 4) {
        dispatch({ type: "finish" });
      }
    }
  };

  const handleSubmitScore = async () => {
    try {
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/quiz/${selectedKidId}`,
        { quizScore: score },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${await secureStorage.getItemAsync(
              "JwtToken"
            )}`,
          },
        }
      );
      dispatchContext({
        type: "submitQuiz",
        payload: { selectedKidQuizScore: score },
      });
      dispatch({ type: "showModal" });
      playCompletedSound();
    } catch (error) {
      console.error("There has been a problem with your PATCH api", error);
      console.error("Response data:", error.response?.data);
    }
  };

  const handleNext = () => {
    dispatch({ type: "next" });
  };
  const handleExit = () => {
    dispatch({ type: "exit" });
    navigation.navigate("TrainSection");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack padding={24} gap={24}>
        {showModal && (
          <Modal isOpen={showModal}>
            <ModalBackdrop />
            <ModalContent>
              <VStack justifyContent="center" alignItems="center">
                <ModalHeader>
                  <Heading size="lg">Congratulation!</Heading>
                </ModalHeader>
                <ModalBody>
                  <SVG xml={happyMascot} width="130" height="130" />
                </ModalBody>
                <ModalFooter>
                  <ButtonFunc
                    text="Complete"
                    handleOnPress={() => handleExit()}
                  />
                </ModalFooter>
              </VStack>
            </ModalContent>
          </Modal>
        )}
        <HStack justifyContent="space-between" alignItems="center" gap={8}>
          <HeaderText
            text="Ear Training"
            xml={earTrainginIcon}
            navigation={navigation}
            section="TrainSection"
          />
          <CloseButton navigation={navigation} section="TrainSection" />
        </HStack>
        <ProgressBar question={question} />
        {pageState === "question" && (
          <>
            <VStack
              alignItems="center"
              justifyContent="center"
              gap={8}
              mb={90}
              height={150}>
              <View style={{ margin: "auto" }}>
                <SVG
                  xml={soundIcon}
                  width="32"
                  height="32"
                  fill={Colors.primary.p2}
                />
              </View>
              <Text style={styles.h1}>Which animal are you hearing?</Text>
            </VStack>
          </>
        )}
        {pageState === "revealAnswer" && (
          <>
            <RevealAnswer
              text={answerState === "correct" ? "Good Job!" : "Try Again!"}
              type={answerState}
            />
          </>
        )}
        <AnimalChoices
          dispatch={dispatch}
          answerState={answerState}
          userAnswer={userAnswer}
          quizData={quizData[question]}
        />
      </VStack>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginHorizontal: 24,
          marginBottom: 48,
        }}>
        {pageState === "question" ? (
          <ButtonFunc
            text="See Answer"
            handleOnPress={() =>
              checkAnswer(
                userAnswer,
                quizData[question].correctAnswer,
                question
              )
            }
          />
        ) : pageState === "revealAnswer" && question < 4 ? (
          <ButtonFunc text="Next" handleOnPress={() => handleNext()} />
        ) : (
          <ButtonFunc text="Finish" handleOnPress={() => handleSubmitScore()} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizSection;
const styles = StyleSheet.create({
  h1: {
    ...Typography.heading.h1,
    marginBottom: 8,
    textAlign: "center",
  },
  bxl: {
    ...Typography.body.bxl,
    ...Typography.bodyFont.regular,
    textAlign: "center",
    maxWidth: 300,
  },
});
