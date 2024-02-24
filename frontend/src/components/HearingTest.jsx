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
          <View>
            <Button title="Start hearing test" onPress={() => setcountPress(press => !press)} />
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