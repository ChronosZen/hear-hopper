import VolumeControl from "../components/user/VolumeControl";
import { SafeAreaView } from "react-native-safe-area-context";

const ParentalControlVolumeAdjustmentScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-between", alignItems: "left" }}
    >
      <VolumeControl goToScreen={"ParentalControl"} buttonPrompt={"Done"} backToNoise={false}/>
    </SafeAreaView>
  );
};

export default ParentalControlVolumeAdjustmentScreen;
