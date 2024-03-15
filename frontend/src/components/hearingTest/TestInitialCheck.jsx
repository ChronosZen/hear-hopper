import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useReducer } from "react";
import {happyMascot} from '../svg/svgs'
import SVG from "../svg/SVG";
import ButtonFunc from "../reusable/ButtonFunc";
import { Typography } from '../../styles/index';

const TestInitialCheck = ({navigation}) => {
    const [setting, setSetting] = useState(0)

    function changeSection(){
        if(setting === 1){
            navigation.navigate("Noise Check")
        }
        if(!setting){
            console.log("change section")
            setSetting(1)
        }
    }
  
    return (
        <View style={{flex: 1, margin: 24}}>
            <View style={styles.container}>
                <SVG xml={happyMascot} width="180" height="180" />
                {setting ? 
                    <View style={{justifyContent: 'space-between', alignItems: 'center', gap: 32}}>
                        <Text style={{...Typography.heading.h4}}>Please make sure to Turn Off</Text>
                        <View>
                            <Text>Notifications</Text>
                        </View>
                        <View>
                            <Text>Sound effects</Text>
                        </View>
                    </View> 
                    : <Text style={{...Typography.heading.h4, textAlign: 'center'}}>Please wear a Headphone for Accurate Results</Text>}
            </View>
                <ButtonFunc text="Proceed" handleOnPress={changeSection} />
        </View>
    );
};

export default TestInitialCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
