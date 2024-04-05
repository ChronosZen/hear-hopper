import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useReducer } from "react";
import ButtonFunc from "../components/reusable/ButtonFunc";
import HeaderText from "../components/reusable/HeaderText";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Image,
  Input,
  VStack,
  SelectVirtualizedList,
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
import CloseButton from "../components/reusable/CloseButton";
import { useNavigation } from "@react-navigation/native";
import { smileIcon, happyMascot } from "../components/svg/svgs";
import SVG from "../components/svg/SVG";

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

  const navigation = useNavigation()

  const yearRange = route.params.yearRange;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} justifyContent="space-between" mx={24} mt={16} mb={24}>
        <HStack justifyContent="space-between" alignItems="center">
          <HeaderText
            text="Create Profile"
            underlineColor={Colors.secondary.g4}
            xml={smileIcon}
          />
          <CloseButton navigation={navigation} section={"MainProfile"} />
        </HStack>

        <VStack flex={1} >
          <VStack mb={24} my={page !== 4 ? '$24' : '$8'}>
            <Text style={{...Typography.heading.h4, textAlign: "center"}}>
              {page === 1 ? "Child’s Name?" : page === 2 ? "Child’s Birth  Year?" : page === 3 ? "Child’s Gender ?" : page === 4 ? "Profile Pic" : page === 5 ? "Hearing Aid?" : ""}
            </Text>
            {page === 5 ? <Text style={styles.hearinAidText}>Do they already have any hearing Aid.</Text> : <></>}
          </VStack>
        {page === 1 && (
          <>
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
          </>
        )}
        {page === 2 && (
          <>
          <Select
          width={Dimensions.get("screen")}
          value={birthYear}
          onValueChange={(newBirthYear) => {
            dispatch({ type: "birthYear", payload: newBirthYear });
          }}
          variant="outline"
          size="md">
          <SelectTrigger variant="rounded" size="md" height={48}>
            <SelectInput placeholder="Select Birth Year" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent h="50%">
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectVirtualizedList
                data={yearRange}
                renderItem={( year ) => {
                return(
                  <SelectItem label={year.item.toString()} value={year.item.toString()} />
                )
                }}
                keyExtractor={(year) => year}
                getItemCount={data => data.length}
                getItem={(data, index) => data[index]}
            />
            </SelectContent>
          </SelectPortal>
          </Select>
          </>
        )}
        {page === 3 && (
          <Select
          width={Dimensions.get("screen")}
          value={gender}
          onValueChange={(newGender) => {
            dispatch({ type: "gender", payload: newGender });
          }}
          variant="outline"
          size="md">
          <SelectTrigger variant="rounded" size="md" height={48}>
            <SelectInput placeholder="Select gender" />
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
              <SelectItem label="Girl" value="Girl" />
              <SelectItem label="Boy" value="Boy" />
              <SelectItem label="Non-binary" value="Non-binary" />
              <SelectItem label="Prefer not to say" value="Prefer not to say" />
            </SelectContent>
          </SelectPortal>
          </Select>

        )}
        {page === 4 && <CameraProfile dispatch={dispatch} />}
        {page === 5 && (
          <FormControl isRequired={true} my={24} mx='$24'>
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
          <VStack alignItems="center" space="xl">
            <SVG xml={happyMascot} width={200} height={200} />
            <Text style={{...Typography.heading.h5, textAlign: "center"}}>Congrats successfully added new kid!!!</Text>
          </VStack>

        )}
        {/* <Text style={{margin: 12, textAlign: "center"}}>
          ID:{userData.id}
          {firstName}
          {gender}
          {birthYear}
          {page}
          {left}
          {right}
        </Text> */}
        {/* <Text>Check ear: {(((page === 1 && birthYear) || (page === 2 && gender) || (page === 3 && image)  || (page === 4 && firstName)) ? "true" : "false")}</Text> */}
        {(image && page !== 6 && page !== 5) && (
          <VStack alignItems="center" my={12}>
          <Image
            size="lg"
            borderRadius="$full"
            alt="test"
            source={{
              uri: image,
            }}
          />
          </VStack>
        )}
        </VStack>
        {(page !== 5) & (page !== 6) ? (
          <ButtonFunc
            handleOnPress={() => dispatch({ type: "next" })}
            text="Next"
            isDisabled={((page === 1 && firstName) || (page === 2 && birthYear) || (page === 3 && gender) || (page === 4 && image)) ? false : true}
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
      </VStack>
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
