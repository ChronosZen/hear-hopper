import { StyleSheet, View } from "react-native";
import TestInitialCheck from "../components/hearingTest/TestInitialCheck";
import TestTutorial from "../components/hearingTest/TestTutorial";
import { SafeAreaView } from "react-native-safe-area-context";

const TestScreen = ({ navigation }) => {
  // function navigateToTutorial(){
  //   navigation.navigate("Tutorial")
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TestInitialCheck navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center'
    // backgroundColor: 'pink',
  },
});
