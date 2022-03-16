import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import normalize from 'react-native-normalize';
import { LOGO } from '../constants/lottie';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

import PushNotification from "react-native-push-notification";
const { weight, type, size } = fonts;

function SplashScreen({ navigation }) {


// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
  
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
  
      // process the action
    },
  
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
  
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
  

    const isFirstTime = async() => {
        return await AsyncStorage.getItem('user');
    }

    useEffect(() => {
        setTimeout(async() => {
            const check = await isFirstTime();
            if(check === null){
                navigation.replace('OnBoardingStack')
            }else{
                navigation.replace('BottomTabStack')
            }
        }, 3200);
    }, []);

    return (
        <SafeAreaView 
            style={styles.container}
        >   
            <StatusBar
                backgroundColor={colors.primary}
            />
            <AnimatedLottieView
                source={LOGO}
                autoPlay
                loop={false}
                style={styles.lottieLogo}
            />
            <Text style={styles.textLogo}>
                Let's Medify
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.backgroundColor,
        justifyContent: 'center'
    },
    lottieLogo: {
        height: normalize(450),
        width: '100%',
        alignSelf: 'center'
    },
    textLogo: {
        fontSize: size.font22,
        fontWeight: weight.semi,
        color: colors.primary,
        fontFamily: type.montserratMedium,
        textAlign: 'center'
    }
})
export default SplashScreen
