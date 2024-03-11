import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useReducer } from 'react';

const TestResult = () => {

    return(
        <View style={styles.container} >
            <View style={styles.spacingView}>
                <Text style={{fontWeight: 'bold', marginLeft: 12, fontSize: 30}}>Test Results</Text>
            </View>
            {/* <View style={styles.spacingView, {flexDirection: 'row', justifyContent: 'space-around'}}> */}
            <View style={[styles.spacingView, {flexDirection: 'row', justifyContent: 'space-around'}]}>
                <View>
                    <Text>Left Ear</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>95</Text>
                </View>
                <View>
                    <Text>Right Ear</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>95</Text>
                </View>
            </View>
            <View style={styles.spacingView}>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>Excellent Hearing</Text>
            </View>
            <View style={{backgroundColor: '#D1D1D1', flex: 1, justifyContent: 'space-between' , padding: 20, borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <Text style={{fontWeight: 'bold'}}>Audiogram</Text>
                <Button title='View Previous Results' />
            </View>
        </View>
      )
}

export default TestResult;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    spacingView: {
        marginVertical: 12
    }
});