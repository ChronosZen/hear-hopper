import {useEffect, useReducer, useState} from 'react'
import { Audio } from 'expo-av';
import { StyleSheet, Text, View, Animated } from 'react-native';
import VoiceGenerator from './VoiceGenerator';

const countDownReducer = (state, action) => {
    switch(action.type){
        case 'dec':
            return {count: state.count-1}
        default:
            return state
    }
}

const CountDown = () => {
    const [state, dispatch] = useReducer(countDownReducer, {count: 3})
    
    async function playSound(){
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/spring.mp3')
        )
        await sound.playAsync();
    }

    useEffect(() => {
        if(state.count>0){
            const interval = setInterval(() => {
                dispatch({type: 'dec'})

                if(state.count===1){
                    clearInterval(interval)
                    playSound()
                }

            }, 1000);
        }


        // return () => clearInterval(interval)
    }, [])

    return (
        <View style={styles.container} >
            {state.count>0 ? 
                <View>
                    <Text style={{textAlign: 'center'}}>Test starts in</Text>
                    <Text style={styles.countDownText} >{state.count}</Text>
                </View> 
            :   <View>
                    <VoiceGenerator />
                </View>
            }
            
        </View>
    )
};

export default CountDown;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    countDownText: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
