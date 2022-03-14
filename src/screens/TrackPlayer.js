import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    useColorScheme,
    BackHandler,
    Alert,
    ToastAndroid
} from 'react-native';
import Slider from '@react-native-community/slider';
import FastImage from 'react-native-fast-image';
import normalize from 'react-native-normalize';
import { BACKWARD_PRIMARY, FAVORITES_BLACK, FAVORITES_PRIMARY, FAVORITES_WHITE, FORWARD_PRIMARY, LEFT_ARROW_PRIMARY, PAUSE_PRIMARY, PLAY_BUTTON_PRIMARY, STARRED, UN_STARRED } from '../constants/icons';
import colors from '../theme/colors'
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayerLoader from '../components/Loaders/TrackPlayer';
import PushNotification from 'react-native-push-notification';

var sound = null;
var timeout = null;
var isFav = false;

function TrackPlayer({
    navigation,
    route
}) {

    const theme = useColorScheme();

    const { item } = route.params;

    Sound.setCategory('Playback', true)

    const { audioTrack, duration, imageUrl, name, description, id } = item;

    const [state, setState] = useState({
        duration: 0,
        sliderState: false,
        playState: 'pause'
    });
    const [currTime, setCurrTime] = useState(0);
    const interval = useRef(setTimeout(() => { }, 0));

    const [isAddedToFav, setIsAddedToFav] = useState(false);
    const [audioLoaded, setAudioLoaded] = useState(false);

    async function playSound() {
        const myFav = await AsyncStorage.getItem('myFav');
        const jsonMyFav = JSON.parse(myFav) || null;
        if (jsonMyFav !== null) {
            let temp = jsonMyFav?.fav?.filter(item => item.id === id);
            if (temp?.length > 0) {
                setIsAddedToFav(true);
                isFav = true;
            }
            // https://docs.google.com/uc?export=download&id=1b6XcTfYnSkkUPxaqfVdRra1xmtwGW1Wk
        }
        sound = new Sound(audioTrack, null, error => {
            if (error) {
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
            setAudioLoaded(true);
            showNotification();
            interval.current = setInterval(function () {
                if (sound && sound._loaded && sound['my_playing'] == true) {
                    sound.getCurrentTime((seconds) => {
                        setCurrTime(seconds);
                    })
                }
            }, 100);

        });
    }

    const showNotification = () => {
        //  PushNotification.localNotification({
        //     /* Android Only Properties */
        //     channelId: 'medify-notification', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        //     // ticker: "My Notification Ticker", // (optional)
        //     showWhen: true, // (optional) default: true
        //     // autoCancel: false, // (optional) default: true
        //     // largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        //     // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        //     // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        //     bigText: `Now Playing ${name}`, // (optional) default: "message" prop
        //     subText: 'Medify with our sound.', // (optional) default: none
        //     // bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        //     // bigLargeIcon: "ic_launcher", // (optional) default: undefined
        //     // bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
        //     color: 'red', // (optional) default: system default
        //     vibrate: true, // (optional) default: true
        //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        //     // tag: "some_tag", // (optional) add tag to message
        //     // group: "group", // (optional) add group to message
        //     // groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        //     // ongoing: true, // (optional) set whether this is an "ongoing" notification
        //     priority: "high", // (optional) set notification priority, default: high
        //     // visibility: "private", // (optional) set notification visibility, default: private
        //     ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        //     // shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        //     // onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false
            
        //     // when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        //     // usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        //     // timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
          
        //     // messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
          
        //     // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        //     // invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
          
        //     /* iOS only properties */
        //     // category: "", // (optional) default: empty string
        //     // subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
          
        //     /* iOS and Android properties */
        //     // id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        //     // title: 'Medify', // (optional)
        //     message: 'My Notification Message', // (required)
        //     // picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
        //     // userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
        //     playSound: true, // (optional) default: true
        //     soundName: audioTrack, // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //     // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        //   });
    }

    const customBackHandler = () => {
        if (sound._loaded) {
            return false;
        } else {
            ToastAndroid.show('Please Wait', ToastAndroid.SHORT);
            return true;
        }
    }

    useEffect(function () {
        playSound();
        BackHandler.addEventListener('hardwareBackPress', customBackHandler);
        return async () => {
            sound.stop();
            BackHandler.removeEventListener('hardwareBackPress', customBackHandler)
            clearTimeout(interval.current);
            const myFav = await AsyncStorage.getItem('myFav');
            const jsonMyFav = JSON.parse(myFav) || null;
            const arr = jsonMyFav ? jsonMyFav?.fav?.filter(item => item.id === id) : [];
            if (isFav === true) {
                if (arr.length === 0) {
                    let temp = jsonMyFav?.fav || [];
                    temp.push(item);
                    await AsyncStorage.setItem('myFav', JSON.stringify({ 'fav': temp }));
                }
            } else {
                if (arr.length > 0) {
                    const newArr = jsonMyFav ? jsonMyFav.fav.filter(item => item.id !== id) : [];
                    await AsyncStorage.setItem('myFav', JSON.stringify({ 'fav': newArr }));
                }
            }
            // timeout.clearTimeout();
        }
    }, []);

    const pauseHandler = () => {
        // sound.stop();
        sound.pause();
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
        // sound.setCurrentTime(currTime);
        setState({
            ...state,
            playState: 'playing'
        });
    }

    const getAudioTimeString = (seconds) => {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    }

    const jumpBackwardHandler = () => {
        if (sound._playing === false) {
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
        if (sound._playing === false) {
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
            {
                audioLoaded === false ?
                    <TrackPlayerLoader theme={theme} />
                    :
                    <>
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
                                        {
                                            theme === 'dark' ?
                                                <Image
                                                    source={FAVORITES_WHITE}
                                                    style={{
                                                        width: normalize(30),
                                                        height: normalize(30)
                                                    }}
                                                /> :
                                                <Image
                                                    source={FAVORITES_BLACK}
                                                    style={{
                                                        width: normalize(30),
                                                        height: normalize(30)
                                                    }}
                                                />

                                        }

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
                                disabled={!audioLoaded}
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
                                source={{ uri: imageUrl }}
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
                                onTouchEnd={() => { }}
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
                                maximumTrackTintColor={colors.textGrey}
                                minimumTrackTintColor={colors.primary}
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

                    </>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: normalize(15)
    },
    image: {
        height: metrics.screenHeight / 3,
        width: '60%',
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
        // color: colors.secondary,
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
