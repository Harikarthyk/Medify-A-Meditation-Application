import React, { useState, useEffect, useRef } from 'react'
import { 
    SafeAreaView, 
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import Slider from '@react-native-community/slider';
import FastImage from 'react-native-fast-image';
import normalize from 'react-native-normalize';
import { BACKWARD_PRIMARY, FAVORITES_PRIMARY, FAVORITES_WHITE, FORWARD_PRIMARY, LEFT_ARROW_PRIMARY, PAUSE_PRIMARY, PLAY_BUTTON_PRIMARY, STARRED, UN_STARRED } from '../constants/icons';
import colors from '../theme/colors'
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';


var sound = null;
var timeout = null;
var isFav = false;

function TrackPlayer({
    navigation,
    route
}) {

    const { item } = route.params;
    
    Sound.setCategory('Playback', true)

    const { audioTrack, duration, imageUrl, name, description, id } = item;

    const [state, setState] = useState({
        duration: 0,
        sliderState: false,
        playState: 'pause'
    });
    const [currTime, setCurrTime] = useState(0);
    const interval = useRef(setTimeout(() => {}, 0));

    const [isAddedToFav, setIsAddedToFav] = useState(false);

    async function playSound() {
        const myFav = await AsyncStorage.getItem('myFav');
        const jsonMyFav = JSON.parse(myFav) || null;
        if(jsonMyFav !== null){
            let temp = jsonMyFav?.fav?.filter(item => item.id === id);
            if(temp?.length > 0){
                setIsAddedToFav(true);
                isFav = true;
            }
        // https://docs.google.com/uc?export=download&id=1b6XcTfYnSkkUPxaqfVdRra1xmtwGW1Wk
        }
        sound = new Sound(audioTrack, null, error => {
            if(error){
                console.log('Its is and Error while playing sound.');
            }
            sound.play();
            setState({
                ...state,
                duration: sound.getDuration(),
                sliderState: true,
                playState: 'playing'
            });
            sound['my_playing'] = true;
            interval.current = setInterval(function(){
                if(sound && sound._loaded &&  sound['my_playing'] == true){
                    sound.getCurrentTime((seconds) => {
                        setCurrTime(seconds);
                    })
                }
            }, 100);
            
        });
    }

    useEffect(function() {
        playSound();
        return async() => {
            sound.stop();
            clearTimeout(interval.current);
            const myFav = await AsyncStorage.getItem('myFav');
            const jsonMyFav = JSON.parse(myFav) || null;
            const arr = jsonMyFav ? jsonMyFav?.fav?.filter(item => item.id === id) : [];
            if(isFav === true){
                if(arr.length === 0){
                    let temp = jsonMyFav?.fav || [];
                    temp.push(item);
                    await AsyncStorage.setItem('myFav', JSON.stringify({'fav': temp}));
                }
            }else{
                if(arr.length > 0){
                    const newArr =jsonMyFav ?  jsonMyFav.fav.filter(item => item.id !== id) : [];
                    await AsyncStorage.setItem('myFav', JSON.stringify({'fav': newArr}));
                }
            }
            // timeout.clearTimeout();
        }
    }, []);

    const pauseHandler = () => {
        sound.stop();
        sound.setCurrentTime(currTime);
        sound['my_playing'] = false;
        setState({
            ...state,
            playState: 'pause'
        });

    }

    const resumeHandler = () => {
        sound.play();
        sound['my_playing'] = true;
        sound.setCurrentTime(currTime);
        setState({
            ...state,
            playState: 'playing'
        });
    }

    const getAudioTimeString = (seconds) => {
        const h = parseInt(seconds/(60*60));
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);

        return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }

    const jumpBackwardHandler = () => {
        if(sound._playing === false){
            setState({
                ...state,
                playState: 'playing'
            });
            sound.play();
        
        }
        sound.setCurrentTime(currTime - 15 > 0 ? currTime - 15 : 0);
        
        sound['my_playing'] = true;
    }

    const jumpForwardHandler = () => {
        if(sound._playing === false){
            sound.play();
            setState({
                ...state,
                playState: 'playing'
            })
        }
        sound.setCurrentTime(currTime + 15 < state.duration ? currTime + 15 : state.duration);
    
        sound['my_playing'] = true;
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    justifyContent: 'space-between',
                    top: normalize(30),
                    alignSelf: 'center'
                }}
            >
                {
                    isAddedToFav === false ? 
                    <TouchableOpacity
                    style={{
                        padding: normalize(10),
                        right: 0,
                        position: 'absolute',
                        
                    }}
                    onPress={() => {
                        isFav = true;
                        setIsAddedToFav(true);
                    }}
                >
                    <Image
                        source={FAVORITES_WHITE}
                        style={{
                            width: normalize(30),
                            height: normalize(30)
                        }}
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={{
                        padding: normalize(10),
                        right: 0,
                        position: 'absolute',
                        
                    }}
                    onPress={() => {
                        isFav = false
                        setIsAddedToFav(false);
                    }}
                >
                    <Image
                        source={FAVORITES_PRIMARY}
                        style={{
                            width: normalize(30),
                            height: normalize(30)
                        }}
                    />
                </TouchableOpacity>

                }
                
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        padding: normalize(10),
                        left: 0,
                        position: 'absolute'
                    }}
                >
                    <Image
                        source={LEFT_ARROW_PRIMARY}
                        style={{
                            width: normalize(30),
                            height: normalize(30)
                        }}
                    />
                </TouchableOpacity>
            </View>
            

            <View
                style={styles.audioPlayerInfo}
            >
                <FastImage
                    source={{uri: imageUrl}}
                    style={styles.image}
                    resizeMode='center'
                />
                <Text
                    style={styles.audioName}
                >
                    {name}
                </Text>
                <Text
                    style={styles.audioDescription}
                >
                    {description}
                </Text>
            </View>
            <View
                style={{
                    marginVertical: normalize(25)
                }}
            >
                <Slider
                    onSlidingComplete={() => {
                        console.log('touch')
                    }}
                    // onTouchMove={() => console.log('onTouchMove')}
                    onTouchEnd={() => {}}
                    // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                    // onTouchCancel={() => console.log('onTouchCancel')}
                    onValueChange={(newTime) => {
                        console.log('new timeeeee')
                        // sound.setCurrentTime(newTime);
                        // setCurrTime(newTime);
                    }}
                    value={currTime}
                    minimumValue={0} 
                    maximumValue={state.duration} 
                    maximumTrackTintColor= {colors.textGrey}
                    minimumTrackTintColor= {colors.primary} 
                    thumbTintColor={colors.primary}
                    
                    style={{ 
                        flex: 1, 
                        width: '100%',
                        alignSelf: 'center'
                    }} 
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                        color: colors.secondary,
                        fontSize: fonts.size.font12,
                        fontWeight: fonts.weight.normal
                    }}
                >
                    {getAudioTimeString(currTime)}
                </Text>
                <Text
                    style={{
                        color: colors.secondary,
                        fontSize: fonts.size.font12,
                        fontWeight: fonts.weight.normal   
                    }}
                >
                    {getAudioTimeString(state.duration)}
                </Text>
            </View>
            <View
                style={styles.player}
            >
                <TouchableOpacity
                    style={styles.buttonsContainer}
                    onPress={jumpBackwardHandler}
                >
                    <Image
                        source={BACKWARD_PRIMARY}
                        style={styles.buttons}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                {
                    state.playState === 'playing' ?
                        <TouchableOpacity
                            style={styles.buttonsContainer}
                            onPress={pauseHandler}
                        >
                            <Image
                                source={PAUSE_PRIMARY}
                                style={styles.buttons}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.buttonsContainer}
                            onPress={resumeHandler}
                        >
                            <Image
                                source={PLAY_BUTTON_PRIMARY}
                                style={styles.buttons}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                }
                
                <TouchableOpacity
                    style={styles.buttonsContainer}
                    onPress={jumpForwardHandler}
                >
                    <Image
                        source={FORWARD_PRIMARY}
                        style={styles.buttons}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: normalize(15)
    },
    image:{
        height: metrics.screenHeight / 3,
        width:'60%',
        alignSelf: 'center',
        elevation: 1,
        // shadowColor: colors.borderColor,
        borderRadius: normalize(8)
    },
    audioPlayerInfo: {

    },
    audioName: {
        color: colors.primary,
        fontFamily: fonts.type.montserratBold,
        fontWeight: fonts.weight.full,
        fontSize: fonts.size.font22,
        textAlign: 'center',
        marginTop: normalize(15),
        marginBottom: normalize(10)
    },
    audioDescription: {
        color: colors.secondary,
        textAlign: 'center',
        fontFamily: fonts.type.montserratMedium,
        fontSize: fonts.size.font14,
        width: '88%',
        alignSelf: 'center',
        marginBottom: normalize(15)
    },
    player: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: normalize(25),
        width: '100%'
    },
    buttonsContainer: {
        padding: normalize(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        width: normalize(30),
        height: normalize(30),
        alignSelf: 'center',
        marginLeft: normalize(5)
    }
})

export default TrackPlayer
