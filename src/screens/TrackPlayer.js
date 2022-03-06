import React from 'react'
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
import { BACKWARD_PRIMARY, FORWARD_PRIMARY, LEFT_ARROW_PRIMARY, PAUSE_PRIMARY, PLAY_BUTTON_PRIMARY } from '../constants/icons';
import colors from '../theme/colors'
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';
import Sound from 'react-native-sound';
import { useEffect, useState } from 'react/cjs/react.development';


var sound = null;

function TrackPlayer({
    navigation,
    route
}) {

    const { item } = route.params;
    
    Sound.setCategory('Playback', true)

    const { audioTrack, duration, imageUrl, name, description, id } = item;

    const [state, setState] = useState({
        playState: 'paused',
        duration: 0,
        sliderState: false,
        playSeconds: 0
    });

    const [currTime, setCurrTime] = useState(0);
    const [currSound, setCurrSound] = useState(null);


    function playSound() {
        sound = new Sound(audioTrack, null, error => {
            if(error){
                console.log('Its is and Error while playing sound.');
            }
            sound.play();
            setState({
                ...state,
                playState: 'playing',
                duration: sound.getDuration(),
                sliderState: true
            });
        });
        setCurrSound(sound);

    }


    useEffect(() => {
        playSound();
        var timeout = setInterval(() => {
            if(sound && sound._loaded && state.playState === 'playing'){
                sound.getCurrentTime((seconds) => {
                    setCurrTime(seconds);
                    setState({...state, playSeconds:seconds });
                })
            }
        }, 100);
        return () => {
            sound.stop();
            clearTimeout(timeout);
            // timeout.clearTimeout();
        }
    }, []);

    const pauseHandler = () => {
        sound.stop();
        setState({
            ...state,
            playState: 'paused',
        });
    }

    const resumeHandler = () => {
        sound.play();
        setState({
            ...state,
            playState: 'playing',
        });
    }

    const getAudioTimeString = (seconds) => {
        const h = parseInt(seconds/(60*60));
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);

        return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }

    const jumpBackwardHandler = () => {
        sound.setCurrTime(state.playState - 15 > 0 ? state.playState - 15 : 0);
    }

    const jumpForwardHandler = () => {
        sound.setCurrTime(state.playState + 15 < state.duration ? state.playState + 15 : state.duration);
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <StatusBar 
                backgroundColor={colors.white}
                barStyle='dark-content'
            />
            <Text style={{color: 'red'}}> {state.playSeconds}</Text>
        {console.log(state, ' as ', currTime)}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: normalize(25),
                    left: normalize(15),
                    padding: normalize(10)
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
            {/* <View>
                <Slider
                    onTouchStart={() => {}}
                    // onTouchMove={() => console.log('onTouchMove')}
                    onTouchEnd={() => {}}
                    // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                    // onTouchCancel={() => console.log('onTouchCancel')}
                    onValueChange={() => {}}
                    value={state.playSeconds}
                    minimumValue={0} 
                    maximumValue={state.duration} 
                    maximumTrackTintColor= 'blue'
                    minimumTrackTintColor= 'green' 
                    thumbTintColor={colors.primary}
                    style={{ 
                        flex: 1, 
                        width: '100%',
                        alignSelf: 'center', 
                        marginHorizontal: normalize(15)
                    }} 
                />
            </View> */}
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
            <View>
                <Text
                    style={{
                        color: colors.primary,
                        fontSize: fonts.size.font18,
                        fontWeight: fonts.weight.normal
                    }}
                >
                    {getAudioTimeString(state.playSeconds)}
                </Text>
                <Text
                    style={{
                        color: colors.primary,
                        fontSize: fonts.size.font18,
                        fontWeight: fonts.weight.normal
                    }}
                >
                    {getAudioTimeString(state.duration)}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        padding: normalize(15)
    },
    image:{
        height: metrics.screenHeight / 3,
        width:'60%',
        alignSelf: 'center',
        elevation: 1,
        shadowColor: colors.borderColor,
        borderRadius: normalize(10)
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
