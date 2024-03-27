import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import SVG from "../svg/SVG";
import { mainMastcot, ear } from "../svg/svgs";
import { VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import { Typography, Colors } from "../../styles/index";
import ButtonFunc from "../../components/reusable/ButtonFunc";


const TestResult = ({ route, navigation }) => {
  const { data } = route.params;
  console.log("this is audiogram object", data);

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
    <ScrollView>
      <VStack style={{ flex: 1, margin: 12 }}>
        <HStack alignItems="center">
            <SVG xml={ear} width="32" height="32" />
          <Text
            style={Typography.heading.h2}
          >
            Results
          </Text>
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
          <SVG xml={mainMastcot} width="180" height="180" />
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

        <VStack
          style={{
            flex: 1,
            justifyContent: "space-between",
            padding: 20,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50
          }}
        >
          <Text style={Typography.heading.h6}>Audiogram</Text>
          {/* Audio Chart */}
          <View>
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
                backgroundColor: "#4900E5",
                backgroundGradientFrom: "#4900E5",
                backgroundGradientTo: "#4900E5",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              fromZero
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>

          <ButtonFunc text="View All Results" handleOnPress={() => navigation.navigate("All Results")} />
        </VStack>
      </VStack>
    </ScrollView>
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
