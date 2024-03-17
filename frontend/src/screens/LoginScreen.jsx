import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputIcon,
  InputSlot,
  VStack,
} from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { Typography, Colors } from "../styles";
import HeaderText from "../components/reusable/HeaderText";
import ButtonFunc from "../components/reusable/ButtonFunc";
import { useUser } from "../context/UserContext";
const CustomAlert = (props) => {
  return (
    <Modal
      style={styles.modal}
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
      <Pressable
        style={[
          Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
          styles.backdrop,
        ]}
        onPress={() => props.setModalVisible(false)}>
        <View>
          <Text style={styles.error}>Wrong UserId or Password</Text>
        </View>
      </Pressable>
    </Modal>
  );
};
const LoginScreen = ({ navigation, route, setIsSignedIn }) => {
  const [email, onChangeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const Login = async (email, password) => {
    const payload = {
      email: email,
      password: String(password),
    };
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          setModalVisible(true);
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("this is data after login", data);
        // setUserData(data);
        setIsSignedIn(true);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch(Login):",
          error
        );
        setModalVisible(true);
        setErrorMessage(error.message);
      });
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <FormControl>
        <VStack space="xl">
          <HeaderText text="Log in" />
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Email
            </Text>
            <Input>
              <InputField
                type="text"
                placeholder="Enter Email"
                onChangeText={onChangeEmail}
                value={email}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Password
            </Text>
            <Input textAlign="center">
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
              />
              <InputSlot pr="$3" onPress={toggleShowPassword}>
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#aaa"
                  style={styles.icon}
                />
              </InputSlot>
            </Input>
          </VStack>
          <View style={styles.signup}>
            <Text style={styles.account}>Don't have account?</Text>
            <Text
              style={styles.signupText}
              onPress={() => {
                navigation.navigate("Sign up");
              }}>
              Sign up
            </Text>
          </View>
        </VStack>
        <ButtonFunc
          handleOnPress={() => Login(email, password)}
          text="Log in"
        />
      </FormControl>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 70,
    margin: 40,
  },
  icon: {
    marginLeft: 10,
  },
  input: { backgroundColor: "white", height: 50, paddingHorizontal: 10 },
  heading: {
    alignItems: "center",
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 30,
  },
  signup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  account: {
    ...Typography.body.bl,
    ...Typography.bodyFont.regular,
    color: Colors.gs.gs2,
  },
  signupText: {
    color: Colors.primary.p2,
    ...Typography.body.bl,
    ...Typography.bodyFont.semibold,
  },
});
