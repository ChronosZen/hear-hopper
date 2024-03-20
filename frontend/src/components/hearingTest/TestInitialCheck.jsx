import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
import {testIcon, soundIcon, notification, mainMastcot} from '../svg/svgs'
import SVG from "../svg/SVG";
import ButtonFunc from "../reusable/ButtonFunc";
import { Typography, Colors } from '../../styles/index';
import { VStack, HStack } from "@gluestack-ui/themed";

const TestInitialCheck = ({navigation}) => {
    const [setting, setSetting] = useState(0)

    function changeSection(){
        if(setting === 1){
            navigation.navigate("Noise Check")
            setSetting(0)
        }
        if(!setting){
            setSetting(1)
        }
    }

    return (
        <VStack flex={1}>
            <VStack style={styles.container}>
                <SVG xml={mainMastcot} width="180" height="180" />
                {setting ?
                    <VStack style={{justifyContent: 'space-between', alignItems: 'start', gap: 32}}>
                        <Text style={{...Typography.heading.h4}}>Please make sure to Turn Off</Text>
                        <HStack marginHorizontal={78}>
                            <SVG xml={notification} width="24" height="24" />
                            <Text>  Notifications</Text>
                        </HStack>
                        <HStack marginHorizontal={78}>
                            <SVG xml={soundIcon} width="24" height="24" />
                            <Text>  Sound effects</Text>
                        </HStack>
                    </VStack>
                    :
                    <>
                    <Text style={{...Typography.heading.h4, textAlign: 'center'}}>Please wear a Headphone for Accurate Results</Text>
                    <VStack flex={1} alignItems= 'center' justifyContent= 'center'>
                        <SVG xml={testIcon} width="120" height="120" fill={Colors.primary.p1} />
                    </VStack>
                    </>
                    }
            </VStack>
            <View style={{marginBottom: 32, marginHorizontal: 24}}>
                <ButtonFunc text="Proceed" handleOnPress={changeSection} />
            </View>
        </VStack>
    );
};

export default TestInitialCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 24, 
    marginHorizontal: 32
  }
});
