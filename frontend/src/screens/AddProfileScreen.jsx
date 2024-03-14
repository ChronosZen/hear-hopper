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
import CameraProfile from "../components/user/CameraProfile";

const initialState = {
  page: 1,
  birthYear: "",
  gender: "",
  image: "",
  firstName: "",
  left: false,
  right: false,
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
    case "firstName":
      return {
        ...state,
        firstName: action.payload,
      };
    case "image":
      return {
        ...state,
        image: action.payload,
      };
    case "left":
      return {
        ...state,
        left: action.payload,
      };
    case "right":
      return {
        ...state,
        right: action.payload,
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
    case "goback":
      return {
        ...state,
        page: 1,
      };
  }
}

const AddProfileScreen = ({ navigation: { goBack }, route }) => {
  const [{ page, birthYear, gender, image, firstName, left, right }, dispatch] =
    useReducer(reducer, initialState);
  const { userData } = route.params;
  const onSubmitKid = async () => {
    const payload = {
      birthYear: parseInt(birthYear),
      gender,
      image,
      firstName,
      hearingAid: { left, right },
    };
    console.log(payload);
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/updateKidInfo/${userData.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      // .then((data) => {
      //   console.log(data);
      // })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch(updateKidInfo):",
          error
        );
      });
  };
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
            autoComplete="birthdate-year"
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
            <Radio value="Girl">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Girl</RadioLabel>
            </Radio>
            <Radio value="Boy">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Boy</RadioLabel>
            </Radio>
            <Radio value="Non-binary">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Non-binary</RadioLabel>
            </Radio>
            <Radio value="Prefer not to say">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Prefer not to say</RadioLabel>
            </Radio>
          </HStack>
        </RadioGroup>
      )}
      {page === 3 && <CameraProfile dispatch={dispatch} />}
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
            onChangeText={(newfirstName) =>
              dispatch({ type: "firstName", payload: newfirstName })
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
            value={left}
            onValueChange={(newValue) => {
              dispatch({ type: "left", payload: newValue });
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
                <SelectItem label="No" value={false} />
                <SelectItem label="Yes" value={true} />
              </SelectContent>
            </SelectPortal>
          </Select>
          <FormControlLabel>
            <FormControlLabelText>Right Ear</FormControlLabelText>
          </FormControlLabel>
          <Select
            width={150}
            value={right}
            onValueChange={(newValue) => {
              dispatch({ type: "right", payload: newValue });
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
                <SelectItem label="No" value={false} />
                <SelectItem label="Yes" value={true} />
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>
      )}
      {page === 6 && (
        <View>
          <Text>Congrat you have added a new kid</Text>
        </View>
      )}
      <Text>
        ID:{userData.id}
        {firstName}
        {gender}
        {birthYear}
        {page}
        {left}
        {right}
      </Text>
      {image && (
        <Image
          size="lg"
          borderRadius="$full"
          alt="test"
          source={{
            uri: image,
          }}
        />
      )}
      {(page !== 5) & (page !== 6) ? (
        <ButtonFunc
          handleOnPress={() => dispatch({ type: "next" })}
          text="Next"
        />
      ) : page === 5 ? (
        <ButtonFunc
          handleOnPress={() => {
            onSubmitKid();
            dispatch({ type: "submit" });
          }}
          text="Submit"
        />
      ) : (
        <ButtonFunc
          handleOnPress={() => {
            goBack();
            dispatch({ type: "goback" });
          }}
          text="Go back"
        />
      )}
    </View>
  );
};

export default AddProfileScreen;

const styles = StyleSheet.create({});
