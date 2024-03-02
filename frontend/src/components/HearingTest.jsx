import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import CountDown from './CountDown';

const HearingTest = () => {
    const [countPress, setcountPress] = useState(false)

    return(
        <View style={styles.container} >
          {countPress ? 
          <View>
            <CountDown />
          </View>
          : 
          <View style={{flex: 1, alignContent: 'space-between', justifyContent: 'space-evenly'}}>
            <Text style={{textAlign: 'center'}}>Please wear a Headphone for Accurate Results</Text>
            <Button title="Start hearing test" onPress={() => setcountPress(true)} />
          </View>}
        </View>
      )
}

export default HearingTest;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});