import VolumeControl from "../components/user/VolumeControl";
import { SafeAreaView } from "@gluestack-ui/themed";

const TestVolumeAdjustmentScreen = () => {

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
        <VolumeControl goToScreen={"Tutorial"}/>
    </SafeAreaView>
  );
};

export default TestVolumeAdjustmentScreen;
