import {
  StyleSheet,
  Text,
  Dimensions
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import SVG from "../svg/SVG";
import { testEar, happyMascot } from "../svg/svgs";
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
    // console.log("inside if block using route -> ", route.params.data.data);
    // console.log("inside if block newData -> ", newData);
    data = newData;
    // console.log("inside if block data -> ", data);
  }
  // const router = useRoute()
  // const routeName = router.name
  // console.log("router coming from testResult component", router)
  // console.log("routeName -> ", routeName);
  // console.log("this is audiogram object", ramroute.params);
  // console.log("this is audiogram object", data);

  // console.log("right left avg: ", data.leftAverage, data.rightAverage)
  // console.log("percentage: ", (100-(data.leftAverage*(100/91))).toFixed(0))
  const checkHearing = (avg) => {
    if(avg >=0 && avg<=25){
        return "Normal hearing"
    }else if(avg >=26 && avg<=40){
        return "Mild hearing loss"
    }else if(avg >=41 && avg<=55){
        return "Moderate hearing loss"
    }else if(avg >=56 && avg<=70){
        return "Moderate severe hearing loss"
    }else if(avg >=71 && avg<=90){
        return "Severe hearing loss"
    }else{
          return "Profound hearing loss"
      }
  }
  return (
    <SafeAreaView flex={1}>
      <VStack flex= {1} m={24} space="3xl">
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
              {(100-(data.leftAverage*(100/91))).toFixed(0)}
            </Text>
          </VStack>
          <SVG xml={happyMascot} width="180" height="180" />
          <VStack justifyContent="center" alignItems="center">
            <Text style={styles.earText}>Right Ear</Text>
            <Text
              style={styles.earValue}
            >
              {(100-(data.rightAverage*(100/91))).toFixed(0)}
            </Text>
          </VStack>
        </HStack>

        <Text
          style={styles.hearingRes}
        >
          {data.leftAverage < data.rightAverage ? checkHearing(data.rightAverage): checkHearing(data.leftAverage)}
        </Text>

        <VStack flex={1} justifyContent="center" >
          <Text style={Typography.heading.h6}>Audiogram</Text>
          {/* Audio Chart */}
          <VStack>
            <LineChart
              data={{
                labels: [500, 1000, 2000, 5000, 8000],
                datasets: [
                  {
                    data: [data.leftEar["500hz"], data.leftEar["1000hz"], data.leftEar["2000hz"], data.leftEar["5000hz"], data.leftEar["8000hz"]]
                  },
                  {
                    data: [data.rightEar["500hz"], data.rightEar["1000hz"], data.rightEar["2000hz"], data.rightEar["5000hz"], data.rightEar["8000hz"]]
                  }
                ]
              }}
              width={Dimensions.get("window").width - 50}
              height={200}
              xAxisLabel="Hz"
              yAxisSuffix="dB"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: Colors.primary.p1,
                backgroundGradientFrom: Colors.primary.p3,
                backgroundGradientTo: Colors.primary.p4,
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

        </VStack>
        <ButtonFunc text="View All Results" handleOnPress={() => navigation.navigate('Test' ,{screen: 'All Results'})} />
      </VStack>
    </SafeAreaView>
  );
};

export default TestResult;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  earText: {
    ...Typography.body.bm
  },
  earValue: {
      ...Typography.heading.h1
  },
  hearingRes: {
      textAlign: 'center',
      ...Typography.heading.h3
  }
});
