import VolumeControl from "../components/user/VolumeControl";
import { SafeAreaView } from "react-native-safe-area-context";

const TestVolumeAdjustmentScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-between", alignItems: "left"}}
    >
      <VolumeControl goToScreen={"Tutorial"} />
    </SafeAreaView>
  );
};

export default TestVolumeAdjustmentScreen;
