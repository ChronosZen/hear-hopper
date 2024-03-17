//	Top of file import
import { Card, Heading, Text, Pressable } from "@gluestack-ui/themed";
import { View } from "react-native";
import { useUser } from "../../context/UserContext";

const TestResultCards = (navigation) => {
  const { kids } = useUser();

  // console.log("this is kidsData from TestResultCards component", kidsData)

  const targetedKid = kids.filter((kidData) => {
    return kidData._id === "65ee715e28d618b42da6c397";
  })[0];
  // console.log("targeted kid => ", targetedKid)

  const audiograms = targetedKid.audiograms.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  // console.log("audiograms from the specific kid", audiograms.map(audiogram => audiogram.createdAt))

  const worstEars = audiograms.map((audiogram) => {
    return Math.max(audiogram.leftAverage, audiogram.rightAverage);
  });
  // console.log("here is the worst ear data ->", worstEar[0])

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

  const hearingLevels = worstEars.map((worstEar) => {
    return hearingZone(worstEar);
  });
  // console.log("hearing levels -> ", hearingLevels)

  const dataOfCards = audiograms.map((audiogram, index) => {
    return { ...audiogram, hearingLevel: hearingLevels[index] };
  });
  console.log(dataOfCards[0].createdAt);

  const latestAudiogram = dataOfCards[0];

  return (
    <>
      {/* <Pressable onPress={navigation.navigate("Test Result")}> */}
      <Card margin={16}>
        <Heading>{latestAudiogram.hearingLevel}</Heading>
        <Text>{latestAudiogram.createdAt}</Text>
      </Card>
      {/* </Pressable> */}

      {/* {dataOfCards.map(dataOfCard =>
                <Pressable onPress={() => {
                    navigation.navigate("Test Result")
                }}>
                    <Card>
                        <Heading>{dataOfCard.hearingLevel}</Heading>
                        <Text>{dataOfCard.createdAt}</Text>
                    </Card>
                </Pressable>
            )} */}
    </>
  );
};

export default TestResultCards;
