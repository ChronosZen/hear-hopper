import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useEffect, useReducer } from "react";
import ButtonFunc from "../components/reusable/ButtonFunc";
import HeaderText from "../components/reusable/HeaderText";
import { SafeAreaView } from "react-native-safe-area-context";
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
  VStack,
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
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import * as secureStorage from "expo-secure-store";
import { Typography, Colors } from "../styles";

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
  const { isPending, error, data } = useQuery({
    queryKey: ["myData"],
    queryFn: async () =>
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${await secureStorage.getItemAsync(
            "JwtToken"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((json) => json.data),
  });

  if (isPending) return <Text>Loading...</Text>;

  if (error) return <Text>An error has occurred: ${error.message}</Text>;

  const userData = data;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      return fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/kid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${await secureStorage.getItemAsync(
            "JwtToken"
          )}`,
        },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myData"] });
      console.log("");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "space-between", margin: 24, marginBottom: 48 }}>
        <HeaderText
          text={page !== 5 ? "Create Profile" : "Hearing Aid"}
          textAlign="center"
        />
        <VStack flex={1} mt="$24">
          <VStack mb={24}>
            <Text style={{...Typography.heading.h4, textAlign: "center"}}>
              {page === 1 ? "Child’s Birth  Year?" : page === 2 ? "Child’s Gender ?" : page === 3 ? "Profile Pic" : page === 4 ? "Child’s Name?" : page === 5 ? "Hearing Aid?" : ""}
            </Text>
            {page === 5 ? <Text style={styles.hearinAidText}>Do they already have any hearing Aid.</Text> : <></>}
          </VStack>
        {page === 1 && (
          <>
          <Input
            variant="outline"
            size="md"
            rounded="$3xl"
            height={48}
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
          </>
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
            rounded="$3xl"
            height={48}
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}>
            <InputField
              placeholder="Enter Name"
              onChangeText={(newfirstName) =>
                dispatch({ type: "firstName", payload: newfirstName })
              }
            />
          </Input>
        )}
        {page === 5 && (
          <FormControl isRequired my={24}>
            <HStack space="2xl" justifyContent="center">
            <VStack space="l">
            <FormControlLabel>
              <FormControlLabelText>Left Ear</FormControlLabelText>
            </FormControlLabel>
            <Select
              width={170}
              value={left}
              onValueChange={(newValue) => {
                dispatch({ type: "left", payload: newValue });
              }}
              variant="outline"
              size="md">
              <SelectTrigger variant="rounded" size="md" height={48}>
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
            </VStack>
            <VStack space="l">
            <FormControlLabel>
              <FormControlLabelText>Right Ear</FormControlLabelText>
            </FormControlLabel>
            <Select
              width={170}
              value={right}
              onValueChange={(newValue) => {
                dispatch({ type: "right", payload: newValue });
              }}
              variant="outline"
              size="md">
              <SelectTrigger variant="rounded" size="md" height={48}>
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
            </VStack>
            </HStack>
          </FormControl>
        )}
        {page === 6 && (
          <View>
            <Text>Congrat you have added a new kid</Text>
          </View>
        )}
        {/* <Text>
          ID:{userData.id}
          {firstName}
          {gender}
          {birthYear}
          {page}
          {left}
          {right}
        </Text> */}
        {/* <Text>Check ear: {(((page === 1 && birthYear) || (page === 2 && gender) || (page === 3 && image)  || (page === 4 && firstName)) ? "true" : "false")}</Text> */}
        {image && (
          <View style={{alignItems:"center", marginVertical: 12}}>
          <Image
            size="lg"
            borderRadius="$full"
            alt="test"
            source={{
              uri: image,
            }}
          />
          </View>
        )}
        </VStack>
        {(page !== 5) & (page !== 6) ? (
          <ButtonFunc
            handleOnPress={() => dispatch({ type: "next" })}
            text="Next"
            isDisabled={((page === 1 && birthYear) || (page === 2 && gender) || (page === 3 && image) || (page === 4 && firstName)) ? false : true}
          />          
        ) : page === 5 ? (
          <ButtonFunc
            handleOnPress={() => {
              mutation.mutate({
                birthYear: parseInt(birthYear),
                gender,
                image,
                firstName,
                hearingAid: { left, right },
              });
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
    </SafeAreaView>
  );
};

export default AddProfileScreen;

const styles = StyleSheet.create({
  hearinAidText: {
    ...Typography.body.bm, 
    ...Typography.bodyFont.semibold, 
    // ...Colors.gs.gs3, 
    textAlign: "center"
  }
});
