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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
const API_URL =
  Platform.OS === "ios" ? "http://localhost:5000" : "http://10.0.2.2:5000";

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
  const Login = async () => {
    const payload = {
      email: email,
      password: String(password),
    };
    fetch(`${API_URL}/login`, {
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
        console.log(data);
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
      <View></View>
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
          style={styles.input}
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
      <Button
        title="Login"
        onPress={() => {
          Login();
        }}
      />
      <View style={styles.signup}>
        <Text>Don't have account?</Text>
        <Text
          style={styles.signupColor}
          onPress={() => {
            navigation.navigate("Sign up");
          }}>
          Sign up
        </Text>
      </View>
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
  },
  signupColor: { color: "#4900E5" },
});
