import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import normalize from 'react-native-normalize';
import { LOGO } from '../constants/lottie';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

const { weight, type, size } = fonts;

function SplashScreen({ navigation }) {

    const isFirstTime = async() => {
        return await AsyncStorage.getItem('firstTime');
    }

    useEffect(() => {
        setTimeout(async() => {
            const check = await isFirstTime();
            if(check === null){
                navigation.replace('OnBoardingStack')
            }else{
                navigation.replace('BottomTabStack')
            }
        }, 4000);
    }, []);

    return (
        <SafeAreaView 
            style={styles.container}
        >
            <AnimatedLottieView
                source={LOGO}
                autoPlay
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
        backgroundColor: colors.backgroundColor,
        justifyContent: 'center'
    },
    lottieLogo: {
        height: normalize(450),
        width: '100%',
        alignSelf: 'center'
    },
    textLogo: {
        fontSize: size.font20,
        fontWeight: weight.semi,
        color: colors.primary,
        fontFamily: type.montserratMedium,
        textAlign: 'center'
    }
})
export default SplashScreen
