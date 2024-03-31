//	Top of file import
import { Card, Heading, Text, Pressable } from "@gluestack-ui/themed";
import { View } from "react-native";
import { useUser } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";

const TestResultCards = () => {
  const { selectedKidAudiograms } = useUser();
  console.log("selectedAudiograms", selectedKidAudiograms);
  const navigation = useNavigation();
  const worstEars = selectedKidAudiograms ? selectedKidAudiograms?.map((audiogram) => {
    return Math.max(audiogram.leftAverage, audiogram.rightAverage);
  }) : [];
  console.log("here is the worst ear data ->", worstEars[0]);

  const hearingZone = (avarage) => {
    if (avarage < 20) {
      return "Normal Hearing";
    } else if (avarage >= 20 && avarage < 40) {
      return "Mild Hearing Loss";
    } else if (avarage >= 40 && avarage < 60) {
      return "Moderate Hearing Loss";
    } else if (avarage >= 60 && avarage < 70) {
      return "Moderately severe Hearing Loss";
    } else if (avarage >= 70) {
      return "Severe Hearing Loss";
    }
  };

  const hearingLevels = worstEars?.map((worstEar) => {
    return hearingZone(worstEar);
  });
  // console.log("hearing levels -> ", hearingLevels);

  const dataOfCards = selectedKidAudiograms ? selectedKidAudiograms?.map((audiogram, index) => {
    return { ...audiogram, hearingLevel: hearingLevels[index] };
  }) : [];
  // console.log(dataOfCards[0].createdAt);

  const latestAudiogram = dataOfCards[0];
  console.log(latestAudiogram);
  return (
    <>
      <Pressable>
        {/* <Pressable onPress={() => navigation.navigate("Test Result")}> */}
        <Card margin={16}>
          <Heading>{latestAudiogram?.hearingLevel}</Heading>
          <Text>{latestAudiogram?.createdAt}</Text>
        </Card>
      </Pressable>
      {/* {dataOfCards.map((dataOfCard) => (
        <Pressable
          onPress={() => {
            navigation.navigate("Test Result");
          }}>
          <Card>
            <Heading>{dataOfCard.hearingLevel}</Heading>
            <Text>{dataOfCard.createdAt}</Text>
          </Card>
        </Pressable>
      ))} */}
    </>
  );
};

export default TestResultCards;
