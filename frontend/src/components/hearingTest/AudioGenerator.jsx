import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import { Audio } from 'expo-av';

const AudioGenerator = () => {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioFile = [
      {uri: '../../../assets/audioFiles/1000hz.wav', volume: 0.8}, 
      {uri: '../../../assets/audioFiles/2000hz.wav', volume: 0.5}, 
      {uri: '../../../assets/audioFiles/5000hz.wav', volume: 0.7}, 
      {uri: '../../../assets/audioFiles/8000hz.wav', volume: 0.8}]

    try{
      async function loadSound({uri, volume}) {
          console.log("uri: ",uri," vol: ",volume)
          const { sound } = await Audio.Sound.createAsync( require(`../../../assets/audioFiles/2000hz.wav`)
          );
          await sound.setVolumeAsync(volume)
          // await sound.setPitchAsync(1.5)
  
          setSound(sound);
      }
      
      async function playSound(){
          // if(!sound){
          //   await loadSound()
          // }
          // console.log(await sound.getStatusAsync());
          if(!isPlaying){
            // await loadSound({uri, volume})
            // console.log("Playing Sound")
            // await sound.playAsync();

            for (let i=0; i<audioFile.length; i++){
              const {uri, volume} = audioFile[i];
              // console.log(audioFile[i])
              await loadSound({uri, volume})
              console.log("Playing audio: ", i)
              await sound.playAsync();
    
              await new Promise(resolve => setTimeout(resolve, 3000))
            }
          }
          // else{
          //   await sound.stopAsync();
          // console.log(await sound.getStatusAsync());
      
          // }
          setIsPlaying(play => !play)
      }
    }catch(error){
      console.log(error)
    }

    // useEffect(() => {
    //     loadSound()
    // },[])
      
    useEffect(() => {
      // const playAudio = async() => {
      //   for (let i=0; i<audioFile.length; i++){
      //     const {hertz, vol} = audioFile[i];
      //     await playSound(hertz, vol)
      //     console.log("Playing audio: ", i)

      //     await new Promise(resolve => setTimeout(resolve, 6000))
      //   }
      // }


      // playAudio()
        // return sound
        //   ? () => {
        //       console.log('Unloading Sound');
        //       sound.unloadAsync();
        //     }
        //   : undefined;

      // return() => {
      //   if(sound){
      //     sound.unloadAsync();
      //   }
      // }
    }, [sound]);

    return (
        <View style={styles.container}>
            <Button title={isPlaying ? 'Stop' : 'Start Playing'} onPress={playSound} />
            <Button title='View Results'  />
        </View>
    );
};

export default AudioGenerator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
});
