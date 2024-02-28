import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useReducer } from "react";
import ButtonFunc from "../components/reusable/ButtonFunc";
import HeaderText from "../components/reusable/HeaderText";
import {
  ChevronDownIcon,
  CircleIcon,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@gluestack-ui/themed";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";

import { InputField } from "@gluestack-ui/themed";
import { FormControl } from "@gluestack-ui/themed";
const initialState = {
  page: 1,
  birthYear: "",
  gender: "",
  profilePic: "",
  profileName: "",
  leftEar: "",
  rightEar: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "birthYear":
      return {
        ...state,
        birthYear: action.payload,
      };
    case "gender":
      return {
        ...state,
        gender: action.payload,
      };
    case "profileName":
      return {
        ...state,
        profileName: action.payload,
      };
    case "leftEar":
      return {
        ...state,
        leftEar: action.payload,
      };
    case "rightEar":
      return {
        ...state,
        rightEar: action.payload,
      };
    case "next":
      return {
        ...state,
        page: state.page + 1,
      };
    case "submit":
      return {
        ...state,
        page: state.page + 1,
      };
  }
}
const AddProfileScreen = () => {
  const [
    { page, birthYear, gender, profilePic, profileName, leftEar, rightEar },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <HeaderText
        text={page !== 5 ? "Create Profile" : "Hearing Aid"}
        textAlign="center"
      />
      {page === 1 && (
        <Input
          m="$4"
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}>
          <InputField
            placeholder="Enter Year here"
            onChangeText={(newBirthYear) =>
              dispatch({ type: "birthYear", payload: newBirthYear })
            }
          />
        </Input>
      )}
      {page === 2 && (
        <RadioGroup
          value={gender}
          onChange={(newGender) =>
            dispatch({ type: "gender", payload: newGender })
          }>
          <HStack space="2xl">
            <Radio value="female">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Female</RadioLabel>
            </Radio>
            <Radio value="male">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Male</RadioLabel>
            </Radio>
          </HStack>
        </RadioGroup>
      )}
      {page === 3 && (
        <Image
          size="lg"
          borderRadius="$full"
          alt="test"
          source={{
            uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          }}
        />
      )}
      {page === 4 && (
        <Input
          m="$4"
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}>
          <InputField
            placeholder="Enter Name here"
            onChangeText={(newProfileName) =>
              dispatch({ type: "profileName", payload: newProfileName })
            }
          />
        </Input>
      )}
      {page === 5 && (
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Left Ear</FormControlLabelText>
          </FormControlLabel>
          <Select
            width={150}
            value={leftEar}
            onValueChange={(newValue) => {
              dispatch({ type: "leftEar", payload: newValue });
            }}
            variant="outline"
            size="md">
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select option" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="No" value="no" />
                <SelectItem label="Yes" value="yes" />
              </SelectContent>
            </SelectPortal>
          </Select>
          <FormControlLabel>
            <FormControlLabelText>Right Ear</FormControlLabelText>
          </FormControlLabel>
          <Select
            width={150}
            value={rightEar}
            onValueChange={(newValue) => {
              dispatch({ type: "rightEar", payload: newValue });
            }}
            variant="outline"
            size="md">
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select option" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="No" value="no" />
                <SelectItem label="Yes" value="yes" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>
      )}
      <Text>
        {profileName}
        {gender}
        {birthYear}
        {leftEar}
        {rightEar}
      </Text>
      {page !== 5 ? (
        <ButtonFunc
          handleOnPress={() => dispatch({ type: "next" })}
          text="Next"
        />
      ) : (
        <ButtonFunc
          handleOnPress={() => dispatch({ type: "submit" })}
          text="Submit"
        />
      )}
    </View>
  );
};

export default AddProfileScreen;

const styles = StyleSheet.create({});
