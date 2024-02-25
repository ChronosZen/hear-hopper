import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  Platform,
  Modal,
  Pressable,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
const API_URL =
  Platform.OS === "ios" ? "http://localhost:8080" : "http://10.0.2.2:8080";

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
const SignUpScreen = ({ navigation, route, setIsSignedIn }) => {
  const [email, onChangeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({ check: false, message: "" });
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (password !== confirmPassword) {
      setError({ check: true, message: "Both password is unmatch" });
      isValid = false;
    }

    if (isValid) {
      Signup();
    }
  };
  const Signup = async () => {
    const payload = {
      email: email,
      password: String(password),
    };
    fetch(`${API_URL}/users/signup`, {
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
          return response.status;
        }
      })
      .then((data) => {
        setIsSignedIn(true);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch:", error);
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
      <View>
        <Text>email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="eg. chris@gmail.com"
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[
            styles.input,
            {
              borderColor: error.check ? "red" : "black",
            },
          ]}
          placeholder="Enter Password"
          placeholderTextColor="#aaa"
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>
      <View>
        <Text>Confirm Password</Text>
        <TextInput
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[
            styles.input,
            {
              borderColor: error.check ? "red" : "black",
            },
          ]}
          placeholder="Enter Password"
          placeholderTextColor="#aaa"
        />
        {error.check ? <Text>{error.message}</Text> : <></>}
        <MaterialCommunityIcons
          name={showConfirmPassword ? "eye-off" : "eye"}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowConfirmPassword}
        />
      </View>
      <Button
        title="Sign up"
        onPress={() => {
          validate();
        }}
      />
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
