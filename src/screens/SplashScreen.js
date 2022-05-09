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
