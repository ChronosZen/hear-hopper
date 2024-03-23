import { StyleSheet, View } from "react-native";
import TestInitialCheck from "../components/hearingTest/TestInitialCheck";

const TestScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TestInitialCheck navigation={navigation} />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
