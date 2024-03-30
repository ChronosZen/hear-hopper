//  Top of file import
import {
  Card,
  Heading,
  Text,
  Pressable,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
// import { View, Text } from "react-native";
import { useUser } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { ear, confusedMascot, chevronRight } from "../svg/svgs";
import SVG from "../svg/SVG";
import { View } from "react-native";
import { Colors, Typography, Spacing } from "../../styles";
import ButtonFunc from "./ButtonFunc";
import moment from "moment";

const TestResultCards = ({ viewSec, handleOnPress }) => {
  const { selectedKidAudiograms } = useUser();
  // console.log("selectedAudiograms", selectedKidAudiograms);
  const navigation = useNavigation();
  const worstEars = selectedKidAudiograms
    ? selectedKidAudiograms?.map((audiogram) => {
      return Math.max(audiogram.leftAverage, audiogram.rightAverage);
    })
    : [];
  // console.log("here is the worst ear data ->", worstEars[0]);

  const hearingZone = (avarage) => {
    if (avarage < 20) {
      return { level: "Normal Hearing", color: Colors.secondary.g4, stroke: Colors.secondary.g1} ;
    } else if (avarage >= 20 && avarage < 40) {
      return { level: "Mild Hearing Loss", color: Colors.accent.b2, stroke: Colors.accent.b1} ;
    } else if (avarage >= 40 && avarage < 60) {
      return { level: "Moderate Hearing Loss", color: Colors.accent.y3, stroke: Colors.accent.y1 };
    } else if (avarage >= 60 && avarage < 70) {
      return { level: "Moderately severe Hearing Loss", color: Colors.accent.o3, stroke: Colors.accent.o1};
    } else if (avarage >= 70) {
      return { level: "Severe Hearing Loss", color: Colors.accent.p3, stroke: Colors.accent.p1};
    }
  };

  const hearingLevels = worstEars?.map((worstEar) => {
    return hearingZone(worstEar);
  });
  // console.log("hearing levels -> ", hearingLevels);
  const dataOfCards = selectedKidAudiograms
    ? selectedKidAudiograms?.map((audiogram, index) => {
      return { ...audiogram, hearingLevel: hearingLevels[index] };
    })
    : [];
  // console.log("data card: ",dataOfCards[0]);
  const latestAudiogram = dataOfCards[0];
  // console.log("latestAudiogram-> ", latestAudiogram)
  // console.log("latestAudiogram.createdAt -> ", latestAudiogram?.createdAt)
  const latestDate = latestAudiogram?.createdAt
  const formattedDate = moment(latestDate).format("Do MMM,YYYY");
  // console.log("latestDate -> ", formattedDate)
  const date = new Date(latestDate)
  // console.log("date -> ", date)

  const dateFormatting = (date) => {
    const formattedDate = moment(date).format("Do MMM YYYY");
    return formattedDate;
  }

  // console.log(latestAudiogram);

  return (
    <>
      {viewSec === 1 ? (
        dataOfCards.length > 0 ? (
          <Pressable onPress={() => {
            // console.log("Is latestAudiogram working-> ", latestAudiogram);
            navigation.navigate("Test Result", { data: latestAudiogram, screenName: 'HomeScreen' })
          }}>
            <Card margin={0}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack alignItems="center" gap={12}>
                  <VStack
                    style={{
                      backgroundColor: latestAudiogram?.hearingLevel.color,
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <SVG xml={ear} width="24" height="24" fill={latestAudiogram?.hearingLevel.color} stroke={latestAudiogram?.hearingLevel.stroke} />
                  </VStack>
                  <VStack>
                    <Heading>{latestAudiogram?.hearingLevel.level}</Heading>
                    <Text>{dateFormatting(latestAudiogram?.createdAt)}</Text>
                  </VStack>
                </HStack>
                <VStack>
                  <SVG xml={chevronRight} width="24" height="24" />
                </VStack>
              </HStack>
            </Card>
          </Pressable>
        ) : (
          // <Pressable>
          <Pressable onPress={() => handleOnPress()}>
            {/* <Pressable navigation.navigate("All Results")> */}
            <Card>
              <Heading>Test Result</Heading>
              <Text>0 taken</Text>
              {/* <Text>{date}</Text> */}
            </Card>
          </Pressable>
        )
      ) : viewSec === 2 ? (
        dataOfCards.length > 0 ? (
          dataOfCards.map((data) => {
            return (
              <VStack key={data.id}>
                {/* <Pressable> */}
                <Pressable
                  onPress={() => {
                    navigation.navigate("Test Result", { data: data, screenName: 'ViewAll' });
                  }}>
                  <Card marginVertical={12}>
                    <HStack alignItems="center" gap={12}>
                      <VStack
                        style={{
                          backgroundColor: data.hearingLevel.color,
                          color: data.hearingLevel.color,
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <SVG xml={ear} width="24" height="24" fill={data?.hearingLevel.color} stroke={data?.hearingLevel.stroke}  />
                      </VStack>
                      <VStack>
                        <Heading>{data.hearingLevel.level}</Heading>
                        <Text>{dateFormatting(data.createdAt)}</Text>
                      </VStack>
                    </HStack>
                  </Card>
                </Pressable>
              </VStack>
            );
          })
        ) : (
          <VStack>
            <VStack alignItems="center">
              <Text style={Typography.heading.h2}>Oops!</Text>
              <Text style={Typography.body.bl}>
                You haven’t taken any tests yet.
              </Text>
              <SVG xml={confusedMascot} width="241" height="241" />
            </VStack>
            <ButtonFunc
              text="Take Hearing Test"
              handleOnPress={() => console.log("HearingTest")}
            />
            <ButtonFunc
              text="Back to Home"
              handleOnPress={() => console.log("Go back")}
            />
          </VStack>
        )
      ) : (
        <Text>No Results</Text>
      )}
    </>
  );
};
export default TestResultCards;
