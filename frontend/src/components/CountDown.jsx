import {useEffect, useReducer, useState} from 'react'
import { Audio } from 'expo-av';
import { StyleSheet, Text, View, Animated } from 'react-native';
import VoiceGenerator from './VoiceGenerator';

// const countDownReducer = (state, action) => {
//     switch(action.type){
//         case 'dec':
//             return {count: state.count-1}
//         default:
//             return state.count
//     }
// }

const CountDown = () => {
    // const [state, dispatch] = useReducer(countDownReducer, {count: 3})
    const [count, setcount] = useState(3)
    
    async function playSound(){
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/spring.mp3')
        )
        await sound.playAsync();
    }

    useEffect(() => {
        if(count>0){
            const interval = setInterval(() => {
                setcount((count) => count-1)

                if(count===1){
                    clearInterval(interval)
                    playSound()
                }

            }, 1000);
        }


        return () => clearInterval(interval)
    }, [])

    return (
        <View style={styles.container} >
            {count>0 ? 
                <Text style={styles.countDownText} >{count}</Text> : 
                <View>
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
        fontWeight: 'bold'
    }
});
