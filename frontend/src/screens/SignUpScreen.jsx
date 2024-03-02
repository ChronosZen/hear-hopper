import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FormControl,
  VStack,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import ButtonFunc from "../components/reusable/ButtonFunc";
import HeaderText from "../components/reusable/HeaderText";
import { Typography, Colors } from "../styles";

const API_URL = "http://ec2-35-167-39-253.us-west-2.compute.amazonaws.com";

const CustomAlert = ({ modalVisible, setModalVisible, errorMessage }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <Pressable
        style={[
          Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
          styles.backdrop,
        ]}
        onPress={() => setModalVisible(false)}>
        <View>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      </Pressable>
    </Modal>
  );
};

const SignUpScreen = ({ setIsSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validateAndSignup = async () => {
    // Basic validation checks
    if (!email) {
      setModalVisible(true);
      setErrorMessage("Email is required");
      return;
    }

    if (!password) {
      setModalVisible(true);
      setErrorMessage("Password is required");
      return;
    }

    if (password.length < 8) {
      setModalVisible(true);
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setModalVisible(true);
      setErrorMessage("Passwords do not match");
      return;
    }
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsSignedIn(true);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      setModalVisible(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        errorMessage={errorMessage}
      />
      <FormControl>
        <VStack space="xl">
          <HeaderText text="Sign Up" />
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Email
            </Text>
            <Input>
              <InputField
                type="text"
                placeholder="Enter Email"
                onChangeText={setEmail}
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
                />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Confirm Password
            </Text>
            <Input textAlign="center">
              <InputField
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <InputSlot pr="$3" onPress={toggleShowConfirmPassword}>
                <MaterialCommunityIcons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#aaa"
                />
              </InputSlot>
            </Input>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
          </VStack>
          <ButtonFunc handleOnPress={validateAndSignup} text="Sign Up" />
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 70,
    margin: 40,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
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
});
