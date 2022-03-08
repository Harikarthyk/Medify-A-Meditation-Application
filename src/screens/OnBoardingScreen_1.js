import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { 
    SafeAreaView, 
    StatusBar, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    useColorScheme
} from 'react-native';
import { YOGA_GIRL } from '../constants/lottie';
import colors from '../theme/colors';
import normalize from 'react-native-normalize';
import fonts from '../theme/fonts';

const { weight, type, size } = fonts;

const Heading = ({theme}) => {
    return (
        <Text 
            style={{
                fontWeight: weight.full,
                fontSize: size.font24,
                textAlign: 'center',
                marginVertical: normalize(10),
                fontFamily: type.montserratMedium,
                color: theme === 'dark'? colors.textPrimaryDark : colors.textPrimaryDefault
            }}
        >
            Welcome to Medify.
        </Text>
    )
}

const SubHeading = ({ content }) => {
    return(
        <Text 
            style={{
                fontWeight: weight.normal ,
                fontSize: size.font16,
                textAlign: 'center',
                marginTop: normalize(5),
                fontFamily: type.montserratRegular,
                color: colors.textGrey
            }}
        >
            {content}
        </Text>
    )
}

const GetStartedButton = ({ onGetStartedButtonHandler }) => {
    return(
        <TouchableOpacity
            style={{
                padding: normalize(15),
                width: '90%',
                alignSelf: 'center',
                backgroundColor: colors.primary,
                borderRadius: normalize(7.5),
                elevation: 1,
                position: 'absolute',
                bottom: normalize(20)
            }}
            onPress={onGetStartedButtonHandler}
        >
            <Text 
                style={{
                    color: colors.white,
                    fontSize: size.font16,
                    textAlign: 'center',
                    fontWeight: weight.semi
                }}
            >
                Get Started
            </Text>
        </TouchableOpacity>
    )
}

function OnBoardingScreen_1({ navigation }) {

    const theme = useColorScheme();

    const onGetStartedButtonHandler = () => {
        navigation.navigate('OnBoardingScreen_2');
    }

    return (
        <SafeAreaView 
            style={styles.container}
        >
            <StatusBar
                backgroundColor={colors.primary}
            />
            <AnimatedLottieView
                source={YOGA_GIRL}
                autoPlay
                style={styles.lottie}
                resizeMode='contain'
            />
            <Heading theme={theme} />
            <SubHeading content={'Boost your Life'} />
            <SubHeading content={'Enhance the World'}  />
            
            <GetStartedButton onGetStartedButtonHandler={onGetStartedButtonHandler} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.backgroundColor,
        justifyContent: 'center'
    },
    lottie: {
        height: normalize(380),
        width: '100%',
        alignSelf: 'center'
    }
})

export default OnBoardingScreen_1
