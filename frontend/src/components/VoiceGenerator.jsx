import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import { Audio } from 'expo-av';

const VoiceGenerator = () => {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    async function loadSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../../assets/spring.mp3')
        );
        await sound.setVolumeAsync(0.8)
        // await sound.setPitchAsync(1.5)

        setSound(sound);
    }
    
    async function playSound(){
        if(!sound){
          await loadSound()
        }
        console.log(await sound.getStatusAsync());
        if(!isPlaying){
          console.log("Playing Sound")
          await sound.playAsync();
        }
        else{
          await sound.stopAsync();
        console.log(await sound.getStatusAsync());
    
        }
        setIsPlaying(play => !play)
    }

    useEffect(() => {
        loadSound()
    },[])
      
    useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
            }
          : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Button title={isPlaying ? 'Stop' : 'Start Playing'} onPress={playSound} />
        </View>
    );
};

export default VoiceGenerator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
});
