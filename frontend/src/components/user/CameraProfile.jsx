import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, ButtonText, VStack } from "@gluestack-ui/themed";
import { refreshIcon } from "../svg/svgs";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Colors } from "../../styles";
import SVG from "../svg/SVG";

export default function CameraProfile({ dispatch, image }) {
  let cameraRef = useRef();
  const [size, setSize] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  // Set the image to be smallest resolution supported by 4:3 aspect ratio to make base64 string small
  const setMinSize = async () => {
    const sizes = await cameraRef.current.getAvailablePictureSizesAsync("4:3");
    setSize(sizes[0]);
  };

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 0,
      base64: true,
      exif: false,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    if (newPhoto && newPhoto.base64) {
      dispatch({
        type: "image",
        payload: `data:image/jpg;base64,${newPhoto.base64}`,
      });
    }
    setPhoto(newPhoto);
  };
  if (photo) {
    return (
      <View style={styles.container}>
        <Image style={styles.preview} source={{ uri: image }} />
        <TouchableOpacity
          onPress={() => setPhoto(undefined)}
          style={{ marginTop: 16 }}>
          <SVG
            xml={refreshIcon}
            width="24"
            height="24"
            fill={Colors.primary.p2}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Camera
      style={styles.container}
      ref={cameraRef}
      pictureSize={size}
      onCameraReady={setMinSize}>
      <Button
        title="Take Pic"
        onPress={takePic}
        bgColor={Colors.primary.p4}
        style={styles.buttonContainer}></Button>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 16,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: Colors.primary.p2,
    borderWidth: 5,
  },
  preview: {
    width: 320,
    height: 320,
    borderRadius: 360,
    marginTop: -36,
  },
});
