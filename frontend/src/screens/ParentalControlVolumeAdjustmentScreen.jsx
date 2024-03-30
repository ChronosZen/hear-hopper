import VolumeControl from "../components/user/VolumeControl";
import { SafeAreaView } from "@gluestack-ui/themed";

const ParentalControlVolumeAdjustmentScreen = () => {

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
        <VolumeControl goToScreen={"ParentalControl"}/>
    </SafeAreaView>
  );
};

export default ParentalControlVolumeAdjustmentScreen;
