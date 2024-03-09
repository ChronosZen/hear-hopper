import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import { LineChart } from "react-native-chart-kit";

const TestResult = ({responseFreq, responsedB, prevResults}) => {

    return(
        <View style={{ flex: 1 }}>
            <View style={styles.spacingView}>
                <Text
                style={{
                    fontWeight: "bold",
                    margin: 12,
                    fontSize: 30
                }}
                >
                Test Results
                </Text>
            </View>

            {/* Ear results */}
            <View
                style={
                (styles.spacingView,
                {
                    flexDirection: "row",
                    justifyContent: "space-around"
                })
                }
            >
                <View>
                <Text>Left Ear</Text>
                <Text
                    style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center"
                    }}
                >
                    95
                </Text>
                </View>
                <View>
                <Text>Right Ear</Text>
                <Text
                    style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center"
                    }}
                >
                    95
                </Text>
                </View>
            </View>

            <View style={styles.spacingView}>
                <Text
                style={{
                    textAlign: "center",
                    fontWeight: "500",
                    paddingVertical: 24
                }}
                >
                Excellent Hearing
                </Text>
            </View>

            <View
                style={{
                backgroundColor: "#D1D1D1",
                flex: 1,
                justifyContent: "space-between",
                padding: 20,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50
                }}
            >
                <Text style={{ fontWeight: "bold" }}>Audiogram</Text>
                {/* Audio Chart */}
                <View>
                <LineChart
                    data={{
                    labels: responseFreq,
                    datasets: [
                        {
                        data: responsedB
                        },
                        {
                        data: [30,10,40,50]
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
                    color: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
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
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                />
                </View>

                <Button
                title="View Previous Results"
                onPress={prevResults}
                />
            </View>
        </View>
      )
}

export default TestResult;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    spacingView: {
        marginVertical: 12
    }
});