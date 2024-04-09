import {
  StyleSheet,
  Text,
  Dimensions
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import SVG from "../svg/SVG";
import { testEar, happyMascot, mainMastcot } from "../svg/svgs";
import { VStack, HStack } from "@gluestack-ui/themed";
import { Typography, Colors } from "../../styles/index";
import ButtonFunc from "../../components/reusable/ButtonFunc";
import HeaderText from "../reusable/HeaderText";
import CloseButton from "../reusable/CloseButton";
import { SafeAreaView } from "react-native-safe-area-context";


const TestResult = ({ route, navigation }) => {
  let data;
  if(route.params.screenName === "HomeScreen" || route.params.screenName === "ViewAll"){
    data = route.params.data;
  } 
  else if(route.params.screenName === "TestScreen"){
    const newData = route.params.data.data;
    data = newData;
  }


  const checkHearing = (avg) => {
    if(avg<=25){
        return "Normal hearing"
    }else if(avg >=26 && avg<=40){
        return "Potential Mild Loss"
    }else if(avg >=41 && avg<=55){
        return "Potential Moderate Loss"
    }else if(avg >=56 && avg<=70){
        return "Potential Severe Loss"
    }else if(avg >=71){
        return "Potential Profound Loss"
    }
  }
  return (
    <SafeAreaView flex={1}>
      <VStack flex= {1} mb={48} mx={24} space="2xl">
        <HStack alignItems="center" justifyContent="space-between">
          <HeaderText text="Results" xml={testEar} underlineColor={Colors.primary.p5} />
          <CloseButton navigation={navigation} section={"Go back"} />
        </HStack>

        {/* Ear results */}
        <HStack justifyContent="center">
          <VStack justifyContent="center" alignItems="center">
            <Text style={styles.earText}>Left Ear</Text>
            <Text
              style={styles.earValue}
            >
              {(100-(data.leftAverage*(100/91))).toFixed(0)}%
            </Text>
          </VStack>
          <SVG xml={data.leftAverage<=25 ? happyMascot : mainMastcot} width="180" height="180" />
          <VStack justifyContent="center" alignItems="center">
            <Text style={styles.earText}>Right Ear</Text>
            <Text
              style={styles.earValue}
            >
              --
            </Text>
          </VStack>
        </HStack>

        <Text
          style={styles.hearingRes}
        >
          {checkHearing(data.leftAverage)}
        </Text>

        <VStack flex={1} justifyContent="center" >
          <Text style={Typography.heading.h6}>Audiogram</Text>
          {/* Audio Chart */}
          <VStack>
            <LineChart
              data={{
                labels: [500, 1000, 2000, 5000, 8000],
                yAxisInterval:20,
                datasets: [
                  //left ear data
                  {
                    data: [data.leftEar["500hz"], data.leftEar["1000hz"], data.leftEar["2000hz"], data.leftEar["5000hz"], data.leftEar["8000hz"]],
                    color: () => Colors.secondary.g1,
                  },
                  //right ear data
                  // {
                  //   data: [data.rightEar["500hz"], data.rightEar["1000hz"], data.rightEar["2000hz"], data.rightEar["5000hz"], data.rightEar["8000hz"]],
                  //   color: (opacity = 1) => Colors.gs.gs6,
                  // }
                ]
              }}
              width={Dimensions.get("window").width - 50}
              height={200}
              xAxisLabel="Hz"
              yAxisSuffix="dB"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: Colors.primary.p1,
                backgroundGradientFrom: Colors.primary.p5,
                backgroundGradientTo: Colors.primary.p5,
                decimalPlaces: 0,
                color: (opacity = 1) => Colors.gs.black,
                labelColor: (opacity = 1) => Colors.gs.black,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: Colors.primary.p3
                }
              }}
              bezier
              fromZero
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </VStack>
          <HStack space="2xl" justifyContent="center">
            <HStack space="xl" alignItems="center">
              <HStack w={40} h={16} borderRadius="$2xl" bg={Colors.secondary.g1} ></HStack>
              <Text>Left</Text>
            </HStack>
            <HStack space="xl" alignItems="center">
              <HStack w={40} h={16} borderRadius="$2xl" bg={Colors.primary.p3} ></HStack>
              <Text>Right</Text>
            </HStack>
          </HStack>
          <ButtonFunc text="View All Results" handleOnPress={() => navigation.navigate("Test",{screen:"All Results"})} />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default TestResult;

const styles = StyleSheet.create({
  earText: {
    ...Typography.body.bm
  },
  earValue: {
      ...Typography.heading.h1
  },
  hearingRes: {
      textAlign: 'center',
      ...Typography.heading.h3,
      color: Colors.primary.p2,
  }
});
