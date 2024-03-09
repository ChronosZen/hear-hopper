import {useEffect, useReducer, useState} from 'react'
import { Audio } from 'expo-av';
import { StyleSheet, Text, View, Animated } from 'react-native';
import AudioGenerator from './AudioGenerator';

// const countDownReducer = (state, action) => {
//     switch(action.type){
//         case 'dec':
//             return {count: state.count-1}
//         default:
//             return state
//     }
// }

const CountDown = ({count}) => {
    // const [state, dispatch] = useReducer(countDownReducer, {count: 3})

    // useEffect(() => {
    //     if(state.count>0){
    //         const interval = setInterval(() => {
    //             dispatch({type: 'dec'})

    //             if(state.count===1){
    //                 clearInterval(interval)
    //                 playSound()
    //             }

    //         }, 1000);
    //     }
    // }, [])

    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ textAlign: "center" }}>Test starts in</Text>
            <Text style={styles.countDownText}>{count}</Text>
        </View>
        // <View style={styles.container} >
        //     {state.count>0 ? 
        //         <View>
        //             <Text style={{textAlign: 'center'}}>Test starts in</Text>
        //             <Text style={styles.countDownText} >{state.count}</Text>
        //         </View> 
        //     :   <View>
        //             <AudioGenerator />
        //         </View>
        //     }
            
        // </View>
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
